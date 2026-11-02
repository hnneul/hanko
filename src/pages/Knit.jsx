import { useEffect, useRef, useState } from 'react'
import { knitRows, startText, withDoneRows, progress } from '../lib/pattern.js'
import Preview from '../components/Preview.jsx'
import Helper from '../components/Helper.jsx'
import { SiteHeader } from '../components/Brand.jsx'

const canWakeLock = typeof navigator !== 'undefined' && 'wakeLock' in navigator

// 따라 뜨기: 단별 설명 + 작은 격자, 한 단씩 체크 (PRD #4-4)
export default function Knit({ pattern, level, onChange, onBack, onHome, onComplete }) {
  const rows = knitRows(pattern)
  const { doneRows, palette } = pattern
  // 다시 들어오면 첫 번째 안 끝낸 단부터
  const current = rows.find((r) => !doneRows.includes(r.row))?.row
  const activeRow = rows.find((r) => r.row === current)
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
      <SiteHeader onHome={onHome}>
        <button type="button" className="btn btn-sm" onClick={onBack}>← 돌아가기</button>
      </SiteHeader>

      <header className="knit-head">
        <div>
          <p className="eyebrow">FOLLOW THE PATTERN</p>
          <h1>{pattern.name}</h1>
        </div>
        <span className="knit-head-count">{doneRows.length} / {rows.length}단</span>
      </header>

      {pattern.status === 'done' && (
        <div className="card celebrate" role="status">
          <h2>완성을 축하해요!</h2>
          <p>{rows.length}단을 모두 떴어요. 내 작업실에서 '완성'으로 보여요.</p>
        </div>
      )}

      <div className="card knit-progress">
        <div className="progress-copy">
          <span>전체 진행률</span>
          <strong>{progress(pattern)}%</strong>
        </div>
        <progress value={doneRows.length} max={rows.length} aria-label="진행률" />
        <p>{doneRows.length}단을 마쳤어요. 남은 {rows.length - doneRows.length}단도 천천히 이어가요.</p>
      </div>

      <div className="knit">
        <section className="knit-main">
          {activeRow ? (
            <div className="card current-step">
              <div className="current-step-head">
                <div>
                  <p className="eyebrow">NOW KNITTING</p>
                  <h2>지금은 {activeRow.row}단</h2>
                </div>
                <span>{activeRow.fromRight ? '오른쪽 → 왼쪽' : '왼쪽 → 오른쪽'}</span>
              </div>
              <div className="current-runs">
                {activeRow.runs.map((run, i) => (
                  <span key={i} className="current-run">
                    <span className="current-run-color" style={{ background: palette[run.color].hex }} />
                    <span><strong>{run.name}</strong><b>{run.count}코</b></span>
                  </span>
                ))}
              </div>
              <p className="current-tip">색이 바뀌는 지점에서 사용하지 않는 실은 코 안쪽으로 감싸며 떠주세요.</p>
            </div>
          ) : (
            <div className="card current-step complete-step">
              <p className="eyebrow">PATTERN COMPLETE</p>
              <h2>모든 단을 완성했어요</h2>
              <p>내 작업실에서 완성된 도안을 다시 확인할 수 있어요.</p>
            </div>
          )}

          <div className="row-list-wrap">
            <div className="row-list-head">
              <h2>전체 단 보기</h2>
              <span>현재 단은 초록색으로 표시돼요</span>
            </div>
            <ol className="card row-list">
              <li className="row-item row-start"><strong>{startText(pattern.width)}</strong></li>
              {rows.map((r) => {
                const done = doneRows.includes(r.row)
                return (
                  <li
                    key={r.row}
                    ref={r.row === current ? currentRef : null}
                    className={`row-item${r.row === current ? ' current' : ''}${done ? ' done' : ''}`}
                    aria-current={r.row === current ? 'step' : undefined}
                  >
                    <span className="row-index">{done ? '✓' : r.row}</span>
                    <span className="row-copy">
                      <strong>{r.row}단</strong>
                      <span>{r.fromRight ? '오른쪽 → 왼쪽' : '왼쪽 → 오른쪽'}</span>
                      <span className="runs">
                        {r.runs.map((run, i) => (
                          <span key={i} className="run">
                            <span className="run-color" style={{ background: palette[run.color].hex }} />
                            {run.name} {run.count}코
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <section className="knit-side">
          <div className="card knit-grid side-card">
            <div className="tool-heading"><h3>도안 위치</h3><span>{current ? `${current}단` : '완성'}</span></div>
            <Preview pattern={pattern} maxWidth={240} currentRow={current} doneRows={doneRows} />
            <p className="muted">진하게 테두리 친 줄이 지금 뜨는 단이에요.</p>
          </div>
          {canWakeLock && (
            <button type="button" className={`btn wake-button${awake ? ' is-awake' : ''}`} aria-pressed={awake} onClick={() => setAwake(!awake)}>
              <span className="wake-dot" aria-hidden="true" /> 화면 켜두기 {awake ? '켜짐' : '꺼짐'}
            </button>
          )}
          <Helper pattern={pattern} level={level} row={activeRow} />
        </section>
      </div>

      {/* 뜨는 동안 손이 바쁘니 한 번에 누를 수 있게 아래에 고정 */}
      <div className="knit-actions">
        <button
          type="button"
          className="btn btn-quiet"
          disabled={doneRows.length === 0}
          onClick={() => onChange(withDoneRows(pattern, doneRows.slice(0, -1)))}
        >
          체크 취소
        </button>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => {
            if (current) {
              onChange(withDoneRows(pattern, [...doneRows, current]))
              return
            }
            onComplete()
          }}
        >
          {current ? `${current}단 완료하기` : '완성! 내 작업실로 가기'}
        </button>
      </div>
    </main>
  )
}
