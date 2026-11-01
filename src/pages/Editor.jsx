import { useRef, useState } from 'react'
import { GRID_MIN, GRID_MAX, MAX_COLORS, AI_MOOD_MAX } from '../config.js'
import { finishedSize, resizeCells, resizeLosesPaint, removeColor } from '../lib/pattern.js'
import { askAI } from '../lib/ai.js'
import Preview from '../components/Preview.jsx'

const BEGINNER_COLORS = 3
const RESET_PROGRESS = { doneRows: [], status: 'design' }

export default function Editor({ pattern, onChange, onBack, onKnit }) {
  const { width, height, cells, palette, gauge } = pattern
  const [color, setColor] = useState(1)
  const [size, setSize] = useState({ width, height })
  const [mood, setMood] = useState('')
  const [ai, setAi] = useState({ loading: false, error: '', palettes: [] })
  const painting = useRef(null) // 드래그 중: { cells: 최신 칸, last: 직전 칸 번호 }
  const current = Math.min(color, palette.length - 1)
  const cm = finishedSize(width, height, gauge)
  const hasProgress = pattern.doneRows.length > 0

  // 뜨는 중인 도안의 무늬를 바꾸면 체크한 단이 안 맞으므로 진행 기록 초기화 (PRD #9)
  // 배색 색값·이름, 게이지만 바꾸는 건 유지
  function okToReset() {
    return !hasProgress || confirm('진행 기록이 초기화돼요. 무늬를 바꿀까요?')
  }

  // 칠하기 (PRD #4-2). 손가락 드래그도 되도록 포인터 위치의 칸을 직접 찾고,
  // 빠르게 움직여도 빈칸이 안 생기게 직전 칸부터 지금 칸까지 선으로 칠함
  function paintAt(e) {
    const i = Number(document.elementFromPoint(e.clientX, e.clientY)?.dataset.cell ?? NaN)
    if (Number.isNaN(i)) return
    const next = [...(painting.current.cells ?? cells)]
    const from = painting.current.last ?? i
    const [x0, y0, x1, y1] = [from % width, Math.floor(from / width), i % width, Math.floor(i / width)]
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1)
    for (let s = 0; s <= steps; s++) {
      next[Math.round(y0 + ((y1 - y0) * s) / steps) * width + Math.round(x0 + ((x1 - x0) * s) / steps)] = current
    }
    painting.current = { cells: next, last: i }
    onChange({ ...pattern, ...RESET_PROGRESS, cells: next })
  }

  function updateColor(index, change) {
    onChange({ ...pattern, palette: palette.map((c, i) => (i === index ? { ...c, ...change } : c)) })
  }

  function addColor() {
    onChange({ ...pattern, palette: [...palette, { name: `새 색 ${palette.length + 1}`, hex: '#e8b9b0' }] })
    setColor(palette.length)
  }

  function deleteColor(index) {
    if (!okToReset()) return
    onChange({
      ...pattern,
      ...RESET_PROGRESS,
      palette: palette.filter((_, i) => i !== index),
      cells: removeColor(cells, index),
    })
    if (current >= index) setColor(Math.max(0, current - 1))
  }

  function applySize(e) {
    e.preventDefault()
    const w = Math.min(GRID_MAX, Math.max(GRID_MIN, Number(size.width) || width))
    const h = Math.min(GRID_MAX, Math.max(GRID_MIN, Number(size.height) || height))
    setSize({ width: w, height: h })
    if (w === width && h === height) return
    const warnings = []
    if (resizeLosesPaint(cells, width, height, w, h)) warnings.push('칠한 칸 일부가 잘려요.')
    if (hasProgress) warnings.push('진행 기록이 초기화돼요.')
    if (warnings.length && !confirm(`${warnings.join(' ')} 크기를 바꿀까요?`)) {
      setSize({ width, height })
      return
    }
    onChange({ ...pattern, ...RESET_PROGRESS, width: w, height: h, cells: resizeCells(cells, width, height, w, h) })
  }

  // AI 배색 추천: 지금 색 수만큼 3안 (PRD #4-3)
  async function recommend(e) {
    e.preventDefault()
    setAi({ loading: true, error: '', palettes: [] })
    try {
      const { palettes } = await askAI({ type: 'palette', mood: mood.trim(), count: palette.length })
      setAi({ loading: false, error: '', palettes })
    } catch (err) {
      setAi({ loading: false, error: err.message, palettes: [] })
    }
  }

  // 무늬(cells)는 그대로, 색만 바꿈. 배색만 바뀌니 진행 기록도 유지 (PRD #9)
  function applyPalette(rec) {
    onChange({ ...pattern, palette: palette.map((c, i) => ({ ...c, ...rec.colors[i] })) })
  }

  function updateGauge(key, value) {
    const n = Number(value)
    if (n > 0) onChange({ ...pattern, gauge: { ...gauge, [key]: n } })
  }

  return (
    <main className="page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>{pattern.name}</h1>

      <div className="editor">
        <section>
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${width}, 1fr)`, maxWidth: width * 28 }}
            onPointerDown={(e) => {
              if (!okToReset()) return
              painting.current = {}
              e.currentTarget.setPointerCapture(e.pointerId)
              paintAt(e)
            }}
            onPointerMove={(e) => painting.current && e.buttons && paintAt(e)}
            onPointerUp={() => (painting.current = null)}
            onPointerCancel={() => (painting.current = null)}
          >
            {cells.map((c, i) => (
              <div key={i} data-cell={i} className="cell" style={{ background: palette[c].hex }} />
            ))}
          </div>
          <p className="muted">
            {width}코 × {height}단 · 맨 아래 줄이 1단이에요.
          </p>
        </section>

        <aside className="editor-side">
          <div className="card">
            <h3>배색</h3>
            <ul className="swatches">
              {palette.map((c, i) => (
                <li key={i} className={i === current ? 'swatch selected' : 'swatch'}>
                  <button
                    type="button"
                    className="swatch-pick"
                    style={{ background: c.hex }}
                    onClick={() => setColor(i)}
                    aria-label={`${c.name}으로 칠하기`}
                    aria-pressed={i === current}
                  />
                  <input
                    type="color"
                    value={c.hex}
                    onChange={(e) => updateColor(i, { hex: e.target.value })}
                    aria-label={`${c.name} 색 바꾸기`}
                  />
                  <input
                    className="swatch-name"
                    value={c.name}
                    onChange={(e) => updateColor(i, { name: e.target.value })}
                    aria-label="색 이름"
                  />
                  {i === 0 ? (
                    <span className="muted">바탕</span>
                  ) : (
                    <button type="button" className="btn btn-sm" onClick={() => deleteColor(i)}>
                      삭제
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {palette.length < MAX_COLORS && (
              <button type="button" className="btn" onClick={addColor}>
                색 추가
              </button>
            )}
            {palette.length === 1 && <p className="muted">"색 추가"로 칠할 색을 넣어 주세요.</p>}
            {palette.length > BEGINNER_COLORS && <p className="muted">초보에게는 2~3색을 추천해요.</p>}
          </div>

          <form className="card" onSubmit={recommend}>
            <h3>AI 배색 추천</h3>
            <div className="ask">
              <input
                className="text-input"
                value={mood}
                maxLength={AI_MOOD_MAX}
                placeholder="예: 봄 느낌으로"
                onChange={(e) => setMood(e.target.value)}
                aria-label="원하는 분위기"
              />
              <button type="submit" className="btn btn-primary" disabled={ai.loading || !mood.trim()}>
                {ai.loading ? '추천 중…' : '추천받기'}
              </button>
            </div>
            <p className="muted">무늬는 그대로 두고 색 {palette.length}개만 바꿔요.</p>
            {ai.error && (
              <p className="error" role="alert">
                {ai.error}
              </p>
            )}
            {ai.palettes.map((rec, i) => (
              <button key={i} type="button" className="palette-pick" onClick={() => applyPalette(rec)}>
                <span className="palette-strip">
                  {rec.colors.map((c, j) => (
                    <span key={j} style={{ background: c.hex }} />
                  ))}
                </span>
                <span>
                  <strong>{rec.name}</strong>
                  <span className="muted"> {rec.colors.map((c) => c.name).join(' · ')}</span>
                </span>
              </button>
            ))}
          </form>

          <form className="card" onSubmit={applySize}>
            <h3>크기</h3>
            <div className="fields">
              <label>
                가로(코)
                <input
                  type="number"
                  min={GRID_MIN}
                  max={GRID_MAX}
                  value={size.width}
                  onChange={(e) => setSize({ ...size, width: e.target.value })}
                />
              </label>
              <label>
                세로(단)
                <input
                  type="number"
                  min={GRID_MIN}
                  max={GRID_MAX}
                  value={size.height}
                  onChange={(e) => setSize({ ...size, height: e.target.value })}
                />
              </label>
            </div>
            <button type="submit" className="btn">
              크기 바꾸기
            </button>
          </form>

          <div className="card">
            <h3>게이지와 완성 크기</h3>
            <div className="fields">
              <label>
                10cm당 코
                <input type="number" min="1" defaultValue={gauge.stitches} onChange={(e) => updateGauge('stitches', e.target.value)} />
              </label>
              <label>
                10cm당 단
                <input type="number" min="1" defaultValue={gauge.rows} onChange={(e) => updateGauge('rows', e.target.value)} />
              </label>
            </div>
            <p>
              완성 크기 <strong>가로 {cm.width}cm × 세로 {cm.height}cm</strong>
            </p>
          </div>

          <div className="card">
            <h3>미리보기</h3>
            <Preview pattern={pattern} />
          </div>

          <button type="button" className="btn btn-primary btn-lg" onClick={onKnit}>
            따라 뜨기
          </button>
        </aside>
      </div>
    </main>
  )
}
