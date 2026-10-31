import { LEVELS } from '../config.js'
import { progress } from '../lib/pattern.js'
import Preview from '../components/Preview.jsx'

const STATUS_NAMES = { design: '디자인 중', knitting: '뜨는 중', done: '완성' }

// 내 작업실: 도안 목록, 이름 바꾸기, 삭제, 수준 설정 (PRD #4-6, #4-1)
export default function Home({ patterns, level, onNew, onOpen, onRename, onDelete, onLevel }) {
  const sorted = [...patterns].sort((a, b) => b.updatedAt - a.updatedAt)

  function rename(p) {
    const name = prompt('새 도안 이름', p.name)?.trim()
    if (name) onRename(p.id, name)
  }

  function remove(p) {
    if (confirm(`'${p.name}' 도안을 삭제할까요? 삭제하면 되돌릴 수 없어요.`)) onDelete(p.id)
  }

  return (
    <main className="page">
      <h1>내 작업실</h1>
      <button type="button" className="btn btn-primary" onClick={onNew}>
        새 도안 만들기
      </button>

      {sorted.length === 0 ? (
        <div className="card empty">
          <h3>첫 도안을 만들어 보세요</h3>
          <p className="muted">템플릿을 골라 칸에 색을 칠하면 나만의 도안이 돼요.</p>
        </div>
      ) : (
        <ul className="pattern-list">
          {sorted.map((p) => (
            <li key={p.id} className="card pattern-card">
              <button type="button" className="pattern-open" onClick={() => onOpen(p.id)}>
                <Preview pattern={p} maxWidth={96} />
                <span>
                  <strong>{p.name}</strong>
                  <span className="muted">
                    {STATUS_NAMES[p.status]} · 진행률 {progress(p)}%
                  </span>
                  <progress value={p.doneRows.length} max={p.height} aria-label="진행률" />
                </span>
              </button>
              <div className="pattern-actions">
                <button type="button" className="btn btn-sm" onClick={() => rename(p)}>
                  이름 바꾸기
                </button>
                <button type="button" className="btn btn-sm" onClick={() => remove(p)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className="card settings">
        <h3>설정</h3>
        <p className="muted">내 수준</p>
        <div className="pattern-actions">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              className={l.id === level ? 'btn btn-primary' : 'btn'}
              aria-pressed={l.id === level}
              onClick={() => onLevel(l.id)}
            >
              {l.name}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
