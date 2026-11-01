// Vercel 서버리스 함수 /api/ai (PRD #7)
// 키는 환경 변수 GEMINI_API_KEY에서만 읽고, 로그·응답에 넣지 않음

import { AI_MODEL } from '../src/config.js'
import { buildRequest, parsePalettes, cleanAnswer } from '../src/lib/ai.js'

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent`

// Gemini 한 번 부르기 → 답 글자, 실패하면 에러(상태 코드만 담음)
async function gemini({ system, prompt, schema, maxTokens }) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: maxTokens,
        ...(schema && { responseMimeType: 'application/json', responseSchema: schema }),
      },
    }),
  })
  if (!res.ok) throw new Error(`gemini ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST만 돼요' })
  const request = buildRequest(req.body)
  if (!request) return res.status(400).json({ error: '요청 형식이 맞지 않아요' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI 설정이 없어요' })

  try {
    if (req.body.type === 'palette') {
      // 형식이 틀리면 한 번 더 요청 (PRD #9)
      for (let i = 0; i < 2; i++) {
        const palettes = parsePalettes(await gemini(request), req.body.count)
        if (palettes) return res.status(200).json({ palettes })
      }
      return res.status(502).json({ error: '배색 형식이 맞지 않아요' })
    }
    const answer = cleanAnswer(await gemini(request))
    if (!answer) return res.status(502).json({ error: '답이 비었어요' })
    return res.status(200).json({ answer })
  } catch (e) {
    console.error(e.message) // 상태 코드만, 키는 안 찍힘
    const status = e.message === 'gemini 429' ? 429 : 502
    return res.status(status).json({ error: '잠시 후 다시 시도해 주세요' })
  }
}
