import { LEVELS } from '../config.js'

// 첫 접속 시 수준 선택 (PRD #4-1)
export default function Level({ onPick }) {
  return (
    <main className="page">
      <h1>어떤 수준인가요?</h1>
      <p className="muted">수준에 맞춰 설명해 드려요. 나중에 내 작업실의 설정에서 바꿀 수 있어요.</p>
      <div className="level-list">
        {LEVELS.map((l) => (
          <button key={l.id} type="button" className="card level-card" onClick={() => onPick(l.id)}>
            <h2>{l.name}</h2>
            <p className="muted">{l.desc}</p>
          </button>
        ))}
      </div>
    </main>
  )
}
