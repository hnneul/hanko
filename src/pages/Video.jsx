import { useEffect, useRef, useState } from 'react'
import { VIDEO_SUBTITLE_MAX } from '../config.js'
import { askAI, youtubeId } from '../lib/ai.js'
import { loadGuideHidden, hideGuide } from '../lib/storage.js'
import { SiteHeader } from '../components/Brand.jsx'

// 초 → "1:05"
function clock(sec) {
  const m = Math.floor(sec / 60)
  return `${m}:${String(sec % 60).padStart(2, '0')}`
}

// 영상 해설 축소판 (선택-1): 자막 붙여넣기 → AI가 단계·시각 정리 → 누르면 그 시각부터 재생
// 정리한 결과는 내 작업실 "영상으로 배운 것"에 저장, saved가 있으면 그걸 열어 봄
export default function Video({ saved, onSave, onBack, onHome }) {
  const [url, setUrl] = useState(saved ? `https://youtu.be/${saved.videoId}` : '')
  const [subtitles, setSubtitles] = useState('')
  const [ai, setAi] = useState({ loading: false, error: '', steps: saved?.steps ?? null })
  const [entry, setEntry] = useState(saved) // 지금 보고 있는 저장 항목
  const [start, setStart] = useState(null) // 누른 단계의 시각, null이면 처음부터 멈춘 채로
  const guide = useRef(null)
  const id = youtubeId(url)

  // 들어오면 할 수 있는 것·없는 것부터 안내 (주소만으로는 정리가 안 됨). "다시 보지 않기"를 눌렀으면 버튼으로만
  function openGuide() {
    if (!guide.current.open) guide.current.showModal()
  }
  useEffect(() => {
    if (!loadGuideHidden()) openGuide()
  }, [])

  async function summarize(e) {
    e.preventDefault()
    // 빠진 게 있으면 누른 뒤에 무엇이 빠졌는지 알려 줌
    const missing = !url.trim() && !subtitles.trim()
      ? '영상 주소와 자막을 넣어 주세요.'
      : !url.trim()
      ? '영상 주소를 넣어 주세요.'
      : !id
        ? '유튜브 영상 주소가 아니에요.'
        : !subtitles.trim()
          ? '자막을 붙여 넣어 주세요.'
          : !/\d:\d{2}/.test(subtitles) && '타임스탬프(0:05 같은 시각)가 있는 자막을 붙여 넣어 주세요.'
    if (missing) {
      setAi({ ...ai, error: missing })
      return
    }
    setAi({ loading: true, error: '', steps: null })
    try {
      const { title, steps } = await askAI({ type: 'video', subtitles: subtitles.trim() })
      setAi({ loading: false, error: steps.length ? '' : '뜨개 영상 자막에서 단계를 찾지 못했어요.', steps })
      if (steps.length) {
        // 같은 영상을 다시 정리하면 덮어쓰고, 다른 영상이면 새로 저장
        const next = { id: entry?.videoId === id ? entry.id : crypto.randomUUID(), videoId: id, title, steps, updatedAt: Date.now() }
        setEntry(next)
        onSave(next)
      }
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
        <button type="button" className="btn btn-sm" onClick={openGuide}>사용 방법 보기</button>
      </div>

      <dialog
        ref={guide}
        className="card video-guide"
        aria-labelledby="video-guide-title"
        onClose={(e) => e.currentTarget.returnValue === 'hide' && hideGuide()}
      >
        <h2 id="video-guide-title">사용 방법</h2>
        <ol>
          <li>유튜브 영상 주소 붙여 넣기</li>
          <li>유튜브 영상 설명의 "스크립트 표시"를 눌러, 시간이 붙은 자막 복사해서 붙여 넣기</li>
          <li>"AI로 단계 정리" 누르고, 나온 단계를 눌러 그 장면부터 보기</li>
        </ol>
        <h3>지금은 이런 것만 됩니다</h3>
        <ul>
          <li>영상 주소만으로는 정리할 수 없습니다. <br />유튜브 공식 기능으로는 다른 사람 영상의 자막을 가져올 수 없어서, 자막은 직접 붙여 넣어야 합니다.</li>
          <li>자막(스크립트)이 없는 영상이나 말 없이 음악만 나오는 영상은 정리할 수 없습니다.</li>
          <li>AI가 자막만 보고 정리해서 틀릴 수 있어 영상과 함께 확인해 주시기 바랍니다.</li>
        </ul>
        <form method="dialog" className="video-guide-actions">
          <button type="submit" className="btn btn-primary">확인</button>
          <button type="submit" value="hide" className="btn btn-quiet">다시 보지 않기</button>
        </form>
      </dialog>

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
          <button type="submit" className="btn btn-primary" disabled={ai.loading}>
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
          {entry && ai.steps?.length > 0 && (
            <div className="video-saved">
              <h2>{entry.title}</h2>
              <p className="muted">내 작업실 "영상으로 배운 것"에 저장돼 있어요.</p>
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
          {ai.steps?.length > 0 && <p className="muted">AI가 자막만 보고 정리해서 틀릴 수 있어 영상과 함께 확인해 주시기 바랍니다.</p>}
        </section>
      </div>
    </main>
  )
}
