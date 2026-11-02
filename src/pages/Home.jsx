import { LEVELS } from '../config.js'
import { progress } from '../lib/pattern.js'
import { guideTotal } from '../lib/ai.js'
import Preview from '../components/Preview.jsx'
import { SiteHeader } from '../components/Brand.jsx'

const STATUS_NAMES = { design: '디자인 중', knitting: '뜨는 중', done: '완성' }

// 내 작업실: 도안 목록, 이름 바꾸기, 삭제, 설명 방식 설정 (PRD #4-6, #4-1)
export default function Home({ patterns, videos, guides, level, onNew, onVideo, onDeleteVideo, onGuide, onDeleteGuide, onOpen, onKnit, onRename, onDelete, onLevel }) {
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
        <button type="button" className="btn btn-sm" onClick={() => onGuide()}>도안 풀어 보기</button>
        <button type="button" className="btn btn-sm" onClick={() => onVideo()}>영상 보며 배우기</button>
        <details className="settings">
          <summary className="btn btn-sm">설명 방식</summary>
          <div className="card settings-pop">
            <p className="settings-title">AI 설명 방식</p>
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
          <p>그리던 도안을 이어서 완성하거나, <br />
          새로운 무늬를 한 코씩 시작해 보세요.</p>
        </div>
        {/* 도안이 없을 때는 아래 "첫 도안 시작하기"만 보이게 */}
        {sorted.length > 0 && <button type="button" className="new-pattern-card" onClick={onNew}>
          <span className="new-pattern-icon" aria-hidden="true">+</span>
          <span>
            <strong>새 도안 만들기</strong>
            <small>빈 격자 또는 템플릿으로 시작</small>
          </span>
          <span className="new-pattern-arrow" aria-hidden="true">→</span>
        </button>}
      </section>

      {sorted.length === 0 ? (
        <section className="empty-workspace">
          <div className="empty-mascot">
            <img
              className="pixel-art"
              src="/characters/koko-empty-workspace-v3-pixel.webp"
              alt="코바늘을 든 픽셀 아트 한코한코 캐릭터 코코"
            />
          </div>
          <div>
            <p className="eyebrow">YOUR FIRST PATTERN</p>
            <h2>첫 도안을 만들어 보세요</h2>
            <p>템플릿을 고르고 칸에 색을 칠하면 나만의 도안이 돼요.</p>
            <button type="button" className="btn btn-primary" onClick={onNew}>시작하기</button>
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
                  {p.status !== 'done' && (
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => onKnit(p.id)}>
                      {p.status === 'knitting' ? '이어서 뜨기' : '따라 뜨기'}
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

      {guides.length > 0 && (
        <section className="projects-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PATTERN GUIDES</p>
              <h2>풀어 본 도안</h2>
            </div>
            <span className="count-pill">{guides.length}개</span>
          </div>
          <ul className="pattern-list">
            {guides.map((g) => {
              const total = guideTotal(g)
              return (
                <li key={g.id} className="pattern-card">
                  <button type="button" className="pattern-open" onClick={() => onGuide(g.id)}>
                    <span className="pattern-copy">
                      <strong>{g.title}</strong>
                      <span className="pattern-progress-copy">{g.done.length} / {total} 완료</span>
                      <progress value={g.done.length} max={total} aria-label="진행률" />
                    </span>
                  </button>
                  <div className="pattern-actions">
                    <button
                      type="button"
                      className="btn btn-sm btn-quiet"
                      onClick={() => confirm(`'${g.title}' 풀이를 삭제할까요?`) && onDeleteGuide(g.id)}
                    >
                      삭제
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {videos.length > 0 && (
        <section className="projects-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LEARNED FROM VIDEOS</p>
              <h2>영상으로 배운 것</h2>
            </div>
            <span className="count-pill">{videos.length}개</span>
          </div>
          <ul className="pattern-list">
            {videos.map((v) => (
              <li key={v.id} className="pattern-card">
                <button type="button" className="pattern-open" onClick={() => onVideo(v.id)}>
                  <span className="pattern-preview">
                    <img src={`https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`} alt="" loading="lazy" />
                  </span>
                  <span className="pattern-copy">
                    <strong>{v.title}</strong>
                    <span className="pattern-progress-copy">{v.steps.length}단계로 정리</span>
                  </span>
                </button>
                <div className="pattern-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-quiet"
                    onClick={() => confirm(`'${v.title}' 정리를 삭제할까요?`) && onDeleteVideo(v.id)}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  )
}
