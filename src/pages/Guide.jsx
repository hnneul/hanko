import { useState } from 'react'
import { GUIDE_TEXT_MAX } from '../config.js'
import { askAI, writtenCount } from '../lib/ai.js'
import { SiteHeader } from '../components/Brand.jsx'

// 코 수 확인: 도안에 적힌 [n]·(n코)와 AI가 센 코 수 비교. 적힌 숫자가 없으면 안 보여 줌
function CountCheck({ row }) {
  const written = writtenCount(row.original)
  if (written === null) return null
  if (written === row.count) return <p className="guide-count ok">✓ {written}코: 도안과 같아요</p>
  return (
    <p className="guide-count warn" role="note">
      ⚠ 도안은 {written}코인데 {row.count ? `풀이는 ${row.count}코예요` : '풀이에서 코 수를 세지 못했어요'}. 이 단은 원문을 다시 확인해 주세요.
    </p>
  )
}

// 도안 풀어 보기 (선택-2): 글 도안 붙여넣기 → AI가 부분·단별로 풀어 씀 → 단 체크
// 격자로 바꾸지 않고 설명·체크만 함 (PRD #5). 결과는 내 작업실 "풀어 본 도안"에 저장
export default function Guide({ saved, level, onSave, onBack, onHome }) {
  const [text, setText] = useState('')
  const [ai, setAi] = useState({ loading: false, error: '' })
  const [guide, setGuide] = useState(saved ?? null)
  const total = guide?.parts.reduce((n, p) => n + p.rows.length, 0) ?? 0

  function update(next) {
    setGuide(next)
    onSave(next)
  }

  async function explain(e) {
    e.preventDefault()
    if (!text.trim()) {
      setAi({ loading: false, error: '도안 글을 붙여 넣어 주세요.' })
      return
    }
    setAi({ loading: true, error: '' })
    try {
      const { title, parts, terms } = await askAI({ type: 'guide', level, text: text.trim() })
      if (!parts.length) {
        setAi({ loading: false, error: '뜨개 도안에서 단을 찾지 못했어요.' })
        return
      }
      setAi({ loading: false, error: '' })
      update({ id: crypto.randomUUID(), title, parts, terms, done: [], updatedAt: Date.now() })
    } catch (err) {
      setAi({ loading: false, error: err.message })
    }
  }

  function toggle(key) {
    const done = guide.done.includes(key) ? guide.done.filter((k) => k !== key) : [...guide.done, key]
    update({ ...guide, done, updatedAt: Date.now() })
  }

  return (
    <main className="page video-page">
      <SiteHeader onHome={onHome}>
        <button type="button" className="btn btn-sm" onClick={onBack}>← 내 작업실</button>
      </SiteHeader>

      <div className="page-intro">
        <p className="eyebrow">PATTERN GUIDE</p>
        <h1>도안 풀어 보기</h1>
        <p>갖고 있는 글 도안을 붙여 넣으면 AI가 단마다 한 코씩 풀어 쓰고, 코 수가 도안과 맞는지 확인해요.</p>
      </div>

      <div className="video-layout">
        <form className="card video-form" onSubmit={explain}>
          <label>
            글 도안
            <textarea
              className="text-input video-subtitles"
              value={text}
              maxLength={GUIDE_TEXT_MAX}
              placeholder={'1단: 매직링, 짧은뜨기 6 [6]\n2단: 늘리기*6 [12]\n3단: (짧은뜨기, 늘리기)*6 [18]'}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <p className="muted">
            원형·입체 도안도 돼요. 글자를 복사할 수 없는 그림·사진 도안은 아직 안 돼요. 붙여 넣은 도안은 내 브라우저에만 저장돼요.
          </p>
          <button type="submit" className="btn btn-primary" disabled={ai.loading}>
            {ai.loading ? '풀어 보는 중…' : 'AI로 풀어 보기'}
          </button>
          {ai.error && <p className="error" role="alert">{ai.error}</p>}
        </form>

        {guide && (
          <section className="guide-result">
            <div className="video-saved">
              <h2>{guide.title}</h2>
              <p className="muted">
                {guide.done.length} / {total} 완료 · 내 작업실 "풀어 본 도안"에 저장돼 있어요.
              </p>
              <progress value={guide.done.length} max={total} aria-label="진행률" />
            </div>

            {guide.parts.map((part, pi) => (
              <section key={pi} className="guide-part">
                <h3>{part.name}</h3>
                <ol className="video-steps">
                  {part.rows.map((row, ri) => {
                    const key = `${pi}-${ri}`
                    const done = guide.done.includes(key)
                    return (
                      <li key={key} className={done ? 'card guide-row done' : 'card guide-row'}>
                        <label className="guide-check">
                          <input type="checkbox" checked={done} onChange={() => toggle(key)} />
                          <strong>{row.label}</strong>
                        </label>
                        <p className="guide-original">{row.original}</p>
                        <ol className="guide-steps">
                          {row.steps.map((s, si) => <li key={si}>{s}</li>)}
                        </ol>
                        <CountCheck row={row} />
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))}

            {guide.terms.length > 0 && (
              <section className="guide-part">
                <h3>이 도안에 나온 용어</h3>
                {guide.terms.map((t) => (
                  <details key={t.word} className="card guide-term">
                    <summary>{t.word}</summary>
                    <p>{t.desc}</p>
                  </details>
                ))}
              </section>
            )}
            <p className="muted">AI가 글만 보고 풀어서 틀릴 수 있어요. 원문과 함께 확인해 주세요.</p>
          </section>
        )}
      </div>
    </main>
  )
}
