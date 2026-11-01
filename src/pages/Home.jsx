import { LEVELS } from '../config.js'
import { progress } from '../lib/pattern.js'
import Preview from '../components/Preview.jsx'
import { SiteHeader } from '../components/Brand.jsx'

const STATUS_NAMES = { design: '디자인 중', knitting: '뜨는 중', done: '완성' }

// 내 작업실: 도안 목록, 이름 바꾸기, 삭제, 수준 설정 (PRD #4-6, #4-1)
export default function Home({ patterns, level, onNew, onOpen, onKnit, onRename, onDelete, onLevel }) {
  const sorted = [...patterns].sort((a, b) => b.updatedAt - a.updatedAt)

  function rename(p) {
    const name = prompt('새 도안 이름', p.name)?.trim()
    if (name) onRename(p.id, name)
  }

  function remove(p) {
    if (confirm(`'${p.name}' 도안을 삭제할까요? 삭제하면 되돌릴 수 없어요.`)) onDelete(p.id)
  }

  return (
    <main className="page workspace-page">
      <SiteHeader>
        <details className="settings">
          <summary className="btn btn-sm">내 수준 설정</summary>
          <div className="card settings-pop">
            <p className="settings-title">설명 수준</p>
            {LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                className={l.id === level ? 'btn btn-sm btn-primary' : 'btn btn-sm'}
                aria-pressed={l.id === level}
                onClick={() => onLevel(l.id)}
              >
                {l.name}
              </button>
            ))}
          </div>
        </details>
      </SiteHeader>

      <section className="workspace-hero">
        <div>
          <p className="eyebrow">MY CROCHET STUDIO</p>
          <h1>내 작업실</h1>
          <p>그리던 도안을 이어서 완성하거나, 새로운 무늬를 한 코씩 시작해 보세요.</p>
        </div>
        <button type="button" className="new-pattern-card" onClick={onNew}>
          <span className="new-pattern-icon" aria-hidden="true">+</span>
          <span>
            <strong>새 도안 만들기</strong>
            <small>빈 격자 또는 템플릿으로 시작</small>
          </span>
          <span className="new-pattern-arrow" aria-hidden="true">→</span>
        </button>
      </section>

      {sorted.length === 0 ? (
        <section className="empty-workspace">
          <div className="empty-swatch" aria-hidden="true">
            <span /><span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <div>
            <p className="eyebrow">YOUR FIRST PATTERN</p>
            <h2>첫 도안을 만들어 보세요</h2>
            <p>템플릿을 고르고 원하는 칸에 색을 칠하면 세상에 하나뿐인 내 도안이 돼요.</p>
            <button type="button" className="btn btn-primary" onClick={onNew}>첫 도안 시작하기</button>
          </div>
        </section>
      ) : (
        <section className="projects-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MY PATTERNS</p>
              <h2>내가 만든 도안</h2>
            </div>
            <span className="count-pill">{sorted.length}개</span>
          </div>
          <ul className="pattern-list">
            {sorted.map((p) => (
              <li key={p.id} className="pattern-card">
                <button type="button" className="pattern-open" onClick={() => onOpen(p.id)}>
                  <span className="pattern-preview"><Preview pattern={p} maxWidth={180} /></span>
                  <span className="pattern-copy">
                    <span className={`status-pill status-${p.status}`}>{STATUS_NAMES[p.status]}</span>
                    <strong>{p.name}</strong>
                    <span className="pattern-progress-copy">진행률 {progress(p)}%</span>
                    <progress value={p.doneRows.length} max={p.height} aria-label="진행률" />
                  </span>
                </button>
                <div className="pattern-actions">
                  {p.status === 'knitting' && (
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => onKnit(p.id)}>
                      이어서 뜨기
                    </button>
                  )}
                  <button type="button" className="btn btn-sm" onClick={() => rename(p)}>이름 바꾸기</button>
                  <button type="button" className="btn btn-sm btn-quiet" onClick={() => remove(p)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
