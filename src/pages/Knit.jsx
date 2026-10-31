import { useEffect, useRef, useState } from 'react'
import { knitRows, startText, withDoneRows, progress } from '../lib/pattern.js'
import Preview from '../components/Preview.jsx'

const canWakeLock = typeof navigator !== 'undefined' && 'wakeLock' in navigator

// 따라 뜨기: 단별 설명 + 작은 격자, 한 단씩 체크 (PRD #4-4)
export default function Knit({ pattern, onChange, onBack }) {
  const rows = knitRows(pattern)
  const { doneRows, palette } = pattern
  // 다시 들어오면 첫 번째 안 끝낸 단부터
  const current = rows.find((r) => !doneRows.includes(r.row))?.row
  const currentRef = useRef(null)
  const [awake, setAwake] = useState(false)

  // 현재 단이 목록 위쪽에 보이게. 화면 전체는 안 움직이도록 목록 안에서만 스크롤
  useEffect(() => {
    const item = currentRef.current
    if (item) item.parentElement.scrollTop = item.offsetTop - item.parentElement.clientHeight / 4
  }, [current])

  // 화면 켜두기 (PRD #9). 다른 앱에 갔다 오면 풀리므로 다시 요청
  useEffect(() => {
    if (!awake) return
    let lock = null
    let on = true
    const request = () =>
      navigator.wakeLock
        .request('screen')
        .then((l) => (on ? (lock = l) : l.release()))
        .catch(() => setAwake(false))
    const onVisible = () => document.visibilityState === 'visible' && request()
    request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      on = false
      document.removeEventListener('visibilitychange', onVisible)
      lock?.release()
    }
  }, [awake])

  return (
    <main className="page knit-page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>{pattern.name}</h1>

      {pattern.status === 'done' && (
        <div className="card celebrate" role="status">
          <h2>완성을 축하해요!</h2>
          <p>{rows.length}단을 모두 떴어요. 내 작업실에서 '완성'으로 보여요.</p>
        </div>
      )}

      <div className="knit">
        <div className="card knit-progress">
          <p>
            <strong>
              {doneRows.length} / {rows.length}단 · 진행률 {progress(pattern)}%
            </strong>
          </p>
          <progress value={doneRows.length} max={rows.length} aria-label="진행률" />
        </div>

        <ol className="card row-list">
          <li className="row-item">
            <strong>{startText(pattern.width)}</strong>
          </li>
          {rows.map((r) => {
            const done = doneRows.includes(r.row)
            return (
              <li
                key={r.row}
                ref={r.row === current ? currentRef : null}
                className={`row-item${r.row === current ? ' current' : ''}${done ? ' done' : ''}`}
                aria-current={r.row === current ? 'step' : undefined}
              >
                <strong>
                  {done && '✓ '}
                  {r.row}단
                </strong>
                <span className="muted"> {r.fromRight ? '오른쪽 → 왼쪽' : '왼쪽 → 오른쪽'}</span>
                <span className="runs">
                  {r.runs.map((run, i) => (
                    <span key={i} className="run">
                      <span className="run-color" style={{ background: palette[run.color].hex }} />
                      {run.name} {run.count}코
                    </span>
                  ))}
                </span>
              </li>
            )
          })}
        </ol>

        <section className="knit-side">
          <div className="card knit-grid">
            <Preview pattern={pattern} maxWidth={240} currentRow={current} doneRows={doneRows} />
            <p className="muted">진하게 테두리 친 줄이 지금 뜨는 단이에요.</p>
          </div>
          {canWakeLock && (
            <button type="button" className="btn" aria-pressed={awake} onClick={() => setAwake(!awake)}>
              화면 켜두기: {awake ? '켜짐' : '꺼짐'}
            </button>
          )}
        </section>
      </div>

      {/* 뜨는 동안 손이 바쁘니 한 번에 누를 수 있게 아래에 고정 */}
      <div className="knit-actions">
        <button
          type="button"
          className="btn"
          disabled={doneRows.length === 0}
          onClick={() => onChange(withDoneRows(pattern, doneRows.slice(0, -1)))}
        >
          체크 취소
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          disabled={!current}
          onClick={() => onChange(withDoneRows(pattern, [...doneRows, current]))}
        >
          {current ? '이 단 끝!' : '완성!'}
        </button>
      </div>
    </main>
  )
}
