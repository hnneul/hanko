import { useRef, useState } from 'react'
import { GRID_MIN, GRID_MAX, MAX_COLORS } from '../config.js'
import { finishedSize, resizeCells, resizeLosesPaint, removeColor } from '../lib/pattern.js'
import Preview from '../components/Preview.jsx'

const BEGINNER_COLORS = 3

export default function Editor({ pattern, onChange, onBack, onKnit }) {
  const { width, height, cells, palette, gauge } = pattern
  const [color, setColor] = useState(1)
  const [size, setSize] = useState({ width, height })
  const painting = useRef(null) // 드래그 중: { cells: 최신 칸, last: 직전 칸 번호 }
  const current = Math.min(color, palette.length - 1)
  const cm = finishedSize(width, height, gauge)

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
    onChange({ ...pattern, cells: next })
  }

  function updateColor(index, change) {
    onChange({ ...pattern, palette: palette.map((c, i) => (i === index ? { ...c, ...change } : c)) })
  }

  function addColor() {
    onChange({ ...pattern, palette: [...palette, { name: `새 색 ${palette.length + 1}`, hex: '#e8b9b0' }] })
    setColor(palette.length)
  }

  function deleteColor(index) {
    onChange({
      ...pattern,
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
    if (resizeLosesPaint(cells, width, height, w, h) && !confirm('칠한 칸 일부가 잘려요. 크기를 바꿀까요?')) {
      setSize({ width, height })
      return
    }
    onChange({ ...pattern, width: w, height: h, cells: resizeCells(cells, width, height, w, h) })
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
              painting.current = {}
              e.currentTarget.setPointerCapture(e.pointerId)
              paintAt(e)
            }}
            onPointerMove={(e) => painting.current && paintAt(e)}
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
            {palette.length > BEGINNER_COLORS && <p className="muted">초보에게는 2~3색을 추천해요.</p>}
          </div>

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
