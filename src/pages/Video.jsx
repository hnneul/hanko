import { useState } from 'react'
import { VIDEO_SUBTITLE_MAX } from '../config.js'
import { askAI, youtubeId } from '../lib/ai.js'
import { SiteHeader } from '../components/Brand.jsx'

// 초 → "1:05"
function clock(sec) {
  const m = Math.floor(sec / 60)
  return `${m}:${String(sec % 60).padStart(2, '0')}`
}

// 영상 해설 축소판 (선택-1): 자막 붙여넣기 → AI가 단계·시각 정리 → 누르면 그 시각부터 재생
export default function Video({ onBack, onHome }) {
  const [url, setUrl] = useState('')
  const [subtitles, setSubtitles] = useState('')
  const [ai, setAi] = useState({ loading: false, error: '', steps: null })
  const [start, setStart] = useState(null) // 누른 단계의 시각, null이면 처음부터 멈춘 채로
  const id = youtubeId(url)

  async function summarize(e) {
    e.preventDefault()
    if (!/\d:\d{2}/.test(subtitles)) {
      setAi({ loading: false, error: '타임스탬프(0:05 같은 시각)가 있는 자막을 붙여 넣어 주세요.', steps: null })
      return
    }
    setAi({ loading: true, error: '', steps: null })
    try {
      const { steps } = await askAI({ type: 'video', subtitles: subtitles.trim() })
      setAi({ loading: false, error: steps.length ? '' : '뜨개 영상 자막에서 단계를 찾지 못했어요.', steps })
    } catch (err) {
      setAi({ loading: false, error: err.message, steps: null })
    }
  }

  return (
    <main className="page video-page">
      <SiteHeader onHome={onHome}>
        <button type="button" className="btn btn-sm" onClick={onBack}>← 내 작업실</button>
      </SiteHeader>

      <div className="page-intro">
        <p className="eyebrow">VIDEO GUIDE</p>
        <h1>영상 보며 배우기</h1>
        <p>유튜브 뜨개 영상의 자막을 붙여 넣으면 AI가 단계별로 정리해요. 단계를 누르면 그 장면부터 재생돼요.</p>
      </div>

      <div className="video-layout">
        <form className="card video-form" onSubmit={summarize}>
          <label>
            유튜브 영상 주소
            <input
              className="text-input"
              value={url}
              placeholder="https://www.youtube.com/watch?v=…"
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          {url && !id && <p className="error">유튜브 영상 주소가 아니에요.</p>}
          <label>
            자막
            <textarea
              className="text-input video-subtitles"
              value={subtitles}
              maxLength={VIDEO_SUBTITLE_MAX}
              placeholder={'0:05 안녕하세요\n0:12 먼저 사슬을 21코 떠 주세요'}
              onChange={(e) => setSubtitles(e.target.value)}
            />
          </label>
          <p className="muted">유튜브에서 영상 설명의 "스크립트 표시"를 열고, 시각이 붙은 자막을 그대로 복사해 붙여 넣어요.</p>
          <button type="submit" className="btn btn-primary" disabled={ai.loading || !id || !subtitles.trim()}>
            {ai.loading ? '정리 중…' : 'AI로 단계 정리'}
          </button>
          {ai.error && <p className="error" role="alert">{ai.error}</p>}
        </form>

        <section className="video-result">
          {id && (
            <div className="video-frame">
              <iframe
                key={start}
                src={`https://www.youtube-nocookie.com/embed/${id}${start === null ? '' : `?start=${start}&autoplay=1`}`}
                title="유튜브 영상"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {ai.steps?.length > 0 && (
            <ol className="video-steps">
              {ai.steps.map((s, i) => (
                <li key={i}>
                  <button type="button" className={s.time === start ? 'card video-step active' : 'card video-step'} onClick={() => setStart(s.time)}>
                    <span className="video-time">{clock(s.time)}</span>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          {ai.steps?.length > 0 && <p className="muted">AI가 자막만 보고 정리해서 틀릴 수 있어요. 영상과 함께 확인해 주세요.</p>}
        </section>
      </div>
    </main>
  )
}
