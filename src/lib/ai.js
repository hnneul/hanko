// AI 요청 만들기·답 검사 (PRD #4-3, #4-5, #7)
// 서버(api/ai.js)와 화면이 같이 씀. 화면은 정해진 값만 보내고 지시문은 서버가 만듦

import {
  AI_QUESTION_MAX,
  AI_MOOD_MAX,
  AI_ANSWER_MAX,
  AI_ERROR,
  GRID_MAX,
  MAX_COLORS,
  LEVEL_PROMPTS,
  HELP_PROMPT,
  PALETTE_PROMPT,
  VIDEO_SUBTITLE_MAX,
  VIDEO_STEPS_MAX,
  VIDEO_PROMPT,
} from '../config.js'

// 글자: 앞뒤 공백 빼고 1~max자가 아니면 null
function text(v, max) {
  if (typeof v !== 'string') return null
  const t = v.trim()
  return t && t.length <= max ? t : null
}

function int(v, min, max) {
  return Number.isInteger(v) && v >= min && v <= max ? v : null
}

const PALETTE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    palettes: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          colors: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: { name: { type: 'STRING' }, hex: { type: 'STRING' } },
              required: ['name', 'hex'],
            },
          },
        },
        required: ['name', 'colors'],
      },
    },
  },
  required: ['palettes'],
}

const STEPS_SCHEMA = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    steps: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: { time: { type: 'STRING' }, title: { type: 'STRING' }, desc: { type: 'STRING' } },
        required: ['time', 'title', 'desc'],
      },
    },
  },
  required: ['title', 'steps'],
}

// "1:05", "1:02:03" → 초. 형식이 틀리면 null
const TIME_RE = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})$/
export function toSeconds(t) {
  const m = TIME_RE.exec(String(t ?? '').trim())
  if (!m || Number(m[3]) > 59) return null
  return Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3])
}

// 유튜브 주소 → 영상 id (watch?v=, youtu.be/, shorts/, embed/). 아니면 null
export function youtubeId(url) {
  const m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/.exec(String(url ?? ''))
  return m ? m[1] : null
}

// 받은 값 검사 → Gemini에 보낼 { system, prompt, schema?, maxTokens }, 틀리면 null
export function buildRequest(body) {
  if (body?.type === 'palette') {
    const mood = text(body.mood, AI_MOOD_MAX)
    const count = int(body.count, 1, MAX_COLORS)
    if (!mood || !count) return null
    return {
      system: PALETTE_PROMPT,
      prompt: `분위기: ${mood}\n색 수: ${count}개`,
      schema: PALETTE_SCHEMA,
      maxTokens: 800,
    }
  }
  if (body?.type === 'video') {
    const subtitles = text(body.subtitles, VIDEO_SUBTITLE_MAX)
    // 타임스탬프가 없으면 단계를 영상 시간에 이을 수 없음
    if (!subtitles || !/\d:\d{2}/.test(subtitles)) return null
    return { system: VIDEO_PROMPT, prompt: `자막:\n${subtitles}`, schema: STEPS_SCHEMA, maxTokens: 1500 }
  }
  if (body?.type === 'help') {
    const question = text(body.question, AI_QUESTION_MAX)
    const level = LEVEL_PROMPTS[body.level]
    const p = body.pattern ?? {}
    const width = int(p.width, 1, GRID_MAX)
    const height = int(p.height, 1, GRID_MAX)
    const done = int(p.doneCount, 0, GRID_MAX)
    const colors = Array.isArray(p.colors) && p.colors.length <= MAX_COLORS ? p.colors.map((c) => text(c, 20)) : null
    if (!question || !level || !width || !height || done === null || !colors || colors.includes(null)) return null

    let rowText = '지금 단: 없음 (모두 떴음)'
    if (body.row != null) {
      const r = body.row
      const row = int(r.row, 1, height)
      const runs = Array.isArray(r.runs) && r.runs.length <= width ? r.runs : null
      const parts = runs?.map((run) => {
        const name = text(run?.name, 20)
        const count = int(run?.count, 1, width)
        return name && count ? `${name} ${count}코` : null
      })
      if (!row || typeof r.fromRight !== 'boolean' || !parts || parts.includes(null)) return null
      rowText = `지금 단: ${row}단, ${r.fromRight ? '오른쪽 → 왼쪽' : '왼쪽 → 오른쪽'}으로, 뜨는 순서: ${parts.join(' → ')}`
    }

    return {
      system: `${HELP_PROMPT}\n\n${level}`,
      prompt: [
        `도안: ${width}코 × ${height}단, 배색 ${colors.join(', ')} (첫 번째가 바탕색)`,
        `진행: ${done}단까지 떴음`,
        rowText,
        `질문: ${question}`,
      ].join('\n'),
      maxTokens: 500,
    }
  }
  return null
}

// 배색 답 검사: 3안, 안마다 색 count개, #rrggbb. 틀리면 null (PRD #9)
export function parsePalettes(raw, count) {
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  const list = data?.palettes
  if (!Array.isArray(list) || list.length !== 3) return null
  const out = list.map((p) => {
    const name = text(p?.name, 20)
    const colors = Array.isArray(p?.colors) && p.colors.length === count ? p.colors : null
    const ok = colors?.every((c) => text(c?.name, 20) && /^#[0-9a-f]{6}$/i.test(c?.hex ?? ''))
    return name && ok ? { name, colors: colors.map((c) => ({ name: c.name.trim(), hex: c.hex.toLowerCase() })) } : null
  })
  return out.includes(null) ? null : out
}

// 영상 해설 답 검사 → { title, steps }. 단계 0~VIDEO_STEPS_MAX개, 시각은 초로 바꿈. 틀리면 null
// 단계가 빈 배열 = 뜨개 영상 자막이 아님. 제목이 없으면 '영상 정리'
export function parseVideo(raw) {
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  const list = data?.steps
  if (!Array.isArray(list) || list.length > VIDEO_STEPS_MAX) return null
  const out = list.map((s) => {
    const time = toSeconds(s?.time)
    const title = text(s?.title, 30)
    const desc = text(s?.desc, 200)
    return time !== null && title && desc ? { time, title, desc: desc.replace(/\*\*/g, '') } : null
  })
  return out.includes(null) ? null : { title: text(data.title, 30) ?? '영상 정리', steps: out }
}

// 도우미 답: 마크다운 별표 빼고 길이 제한
export function cleanAnswer(raw) {
  const t = String(raw ?? '').replace(/\*\*/g, '').trim()
  if (!t) return null
  return t.length > AI_ANSWER_MAX ? `${t.slice(0, AI_ANSWER_MAX)}…` : t
}

// 화면에서 부르기. 실패하면 AI_ERROR를 담은 에러
export async function askAI(body) {
  let res
  try {
    res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error(AI_ERROR)
  }
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) throw new Error(AI_ERROR)
  return data
}
