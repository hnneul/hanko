import { LEVELS } from '../config.js'
import { Brand } from '../components/Brand.jsx'

// 첫 접속 시 수준 선택 (PRD #4-1)
export default function Level({ onPick }) {
  return (
    <main className="page level-page">
      <Brand />
      <section className="level-hero">
        <div className="level-intro">
          <p className="eyebrow">WELCOME, MAKER</p>
          <h1>어떤 속도로<br />함께 떠볼까요?</h1>
          <p>지금 나에게 맞는 설명 깊이를 골라 주세요.<br className="desktop-only" /> 나중에 내 작업실에서 언제든 바꿀 수 있어요.</p>
        </div>

        <div className="level-list">
          {LEVELS.map((l, index) => (
            <button key={l.id} type="button" className="level-card" onClick={() => onPick(l.id)}>
              <span className="level-number">0{index + 1}</span>
              <span className="level-card-copy">
                <strong>{l.name}</strong>
                <span>{l.desc}</span>
              </span>
              <span className="level-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </section>

      <p className="level-note">고른 설명 방식에 맞춰 AI 도우미의 설명이 달라져요.</p>
    </main>
  )
}
