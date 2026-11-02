import { useEffect, useRef, useState } from 'react'
import { normalizeHex } from '../lib/color.js'

const YARN_COLORS = [
  { name: '아이보리', hex: '#F6F1E7' },
  { name: '오트밀', hex: '#D9CBB8' },
  { name: '버터', hex: '#E9D8B6' },
  { name: '살구', hex: '#E8B9B0' },
  { name: '코랄', hex: '#D8897B' },
  { name: '벽돌', hex: '#A96052' },
  { name: '세이지', hex: '#A8B9A3' },
  { name: '올리브', hex: '#879276' },
  { name: '포레스트', hex: '#4D624B' },
  { name: '스카이', hex: '#AFC7CF' },
  { name: '라일락', hex: '#B8AEC8' },
  { name: '차콜', hex: '#55514D' },
]

export default function ColorPicker({ color, name, onChange }) {
  const root = useRef(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(() => normalizeHex(color) ?? '#E8B9B0')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return undefined
    function closeFromOutside(event) {
      if (!root.current?.contains(event.target)) setOpen(false)
    }
    function closeFromKeyboard(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromKeyboard)
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromKeyboard)
    }
  }, [open])

  function choose(next) {
    setDraft(next)
    setError('')
    onChange(next)
  }

  function typeHex(value) {
    const next = value.toUpperCase()
    setDraft(next)
    const normalized = normalizeHex(next)
    if (normalized && next.replace(/^#/, '').length === 6) {
      setError('')
      onChange(normalized)
    }
  }

  function finish() {
    const normalized = normalizeHex(draft)
    if (!normalized) {
      setError('HEX 코드는 # 뒤에 숫자·영문 6자리로 입력해 주세요.')
      return
    }
    choose(normalized)
    setOpen(false)
  }

  const current = normalizeHex(color) ?? '#E8B9B0'

  return (
    <div className="color-picker" ref={root}>
      <button
        type="button"
        className="color-picker-trigger"
        onClick={() => {
          setDraft(current)
          setError('')
          setOpen((value) => !value)
        }}
        aria-label={`${name} 색상 코드 바꾸기`}
        aria-expanded={open}
      >
        <span style={{ background: current }} />
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m13.9 3.2 2.9 2.9-8.6 8.6-3.7.8.8-3.7 8.6-8.6Z" />
        </svg>
      </button>

      {open && (
        <div className="color-picker-panel" role="dialog" aria-label={`${name} 색상 바꾸기`}>
          <div className="color-picker-head">
            <div>
              <span className="color-picker-kicker">YARN COLOR</span>
              <strong>색상 바꾸기</strong>
            </div>
            <button type="button" className="color-picker-close" onClick={() => setOpen(false)} aria-label="색상 패널 닫기">×</button>
          </div>

          <div className="color-picker-current">
            <span className="color-picker-preview" style={{ background: current }} />
            <div>
              <span>현재 색상</span>
              <strong>{current}</strong>
            </div>
          </div>

          <div className="color-picker-presets" aria-label="추천 색상">
            {YARN_COLORS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                className={current === preset.hex ? 'active' : ''}
                style={{ background: preset.hex }}
                onClick={() => choose(preset.hex)}
                aria-label={`${preset.name} ${preset.hex}`}
                aria-pressed={current === preset.hex}
                title={`${preset.name} ${preset.hex}`}
              />
            ))}
          </div>

          <label className="color-picker-hex">
            <span>HEX 코드</span>
            <input
              value={draft}
              maxLength={7}
              placeholder="#E8B9B0"
              spellCheck="false"
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'hex-color-error' : undefined}
              onChange={(event) => typeHex(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  finish()
                }
              }}
            />
          </label>
          {error ? <p className="color-picker-error" id="hex-color-error" role="alert">{error}</p> : <p className="color-picker-help">예: #E8B9B0 · 앞의 #까지 함께 입력해요.</p>}
          <button type="button" className="btn btn-primary btn-sm color-picker-done" onClick={finish}>이 색으로 선택</button>
        </div>
      )}
    </div>
  )
}

