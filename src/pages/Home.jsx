import { useEffect, useRef, useState } from 'react'
import { LEVELS } from '../config.js'
import { progress } from '../lib/pattern.js'
import { guideTotal } from '../lib/ai.js'
import Preview from '../components/Preview.jsx'
import { SiteHeader } from '../components/Brand.jsx'

const STATUS_NAMES = { design: '디자인 중', knitting: '뜨는 중', done: '완성' }

// 내 작업실: 도안 목록, 이름 바꾸기, 삭제, 설명 방식 설정 (PRD #4-6, #4-1)
export default function Home({ patterns, videos, guides, level, onNew, onVideo, onDeleteVideo, onGuide, onRenameGuide, onDeleteGuide, onOpen, onKnit, onRename, onDelete, onLevel }) {
  const sorted = [...patterns].sort((a, b) => b.updatedAt - a.updatedAt)

  // 브라우저 팝업(prompt·confirm) 대신 카드 안에서 이름 바꾸고, 삭제는 사이트 팝업으로 확인
  const [renaming, setRenaming] = useState(null) // { id, value }
  const [deleting, setDeleting] = useState(null) // { text, run }
  const dialog = useRef(null)

  // 닫아도 deleting은 그대로 둠(닫는 이벤트가 늦게 와도 문구가 비지 않게). 새로 누를 때마다 새 객체라 다시 열림
  useEffect(() => {
    if (deleting) dialog.current.showModal()
  }, [deleting])

  function renameForm(onSave) {
    function save(e) {
      e.preventDefault()
      const name = renaming.value.trim()
      if (name) onSave(renaming.id, name)
      setRenaming(null)
    }
    return (
      <form className="rename-form" onSubmit={save}>
        <input
          className="text-input"
          value={renaming.value}
          maxLength={30}
          autoFocus
          aria-label="새 도안 이름"
          onChange={(e) => setRenaming({ ...renaming, value: e.target.value })}
          onKeyDown={(e) => e.key === 'Escape' && setRenaming(null)}
        />
        <button type="submit" className="btn btn-sm btn-primary">저장</button>
        <button type="button" className="btn btn-sm btn-quiet" onClick={() => setRenaming(null)}>취소</button>
      </form>
    )
  }

  return (
    <main className="page workspace-page">
      <SiteHeader>
        {/* 기능은 연초록 알약, 거의 안 바꾸는 설명 방식은 톱니바퀴 아이콘으로 */}
        <button type="button" className="btn btn-sm nav-pill" onClick={() => onGuide()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0M3 6v13M12 6v13M21 6v13" /></svg>
          도안 풀어 보기
        </button>
        <button type="button" className="btn btn-sm nav-pill" onClick={() => onVideo()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13 -8z" /></svg>
          영상 보며 배우기
        </button>
        <details className="settings">
          <summary className="btn btn-sm nav-icon" aria-label="설명 방식" title="설명 방식">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </summary>
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

      <dialog ref={dialog} className="card video-guide confirm-pop" aria-labelledby="delete-title">
        <h2 id="delete-title">{deleting?.text}</h2>
        <p>삭제하면 되돌릴 수 없어요.</p>
        <form method="dialog" className="video-guide-actions">
          <button type="submit" className="btn btn-primary" onClick={() => deleting.run()}>삭제</button>
          <button type="submit" className="btn btn-quiet">취소</button>
        </form>
      </dialog>

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
                  {renaming?.id === p.id ? renameForm(onRename) : (
                    <>
                      {p.status !== 'done' && (
                        <button type="button" className="btn btn-sm btn-primary" onClick={() => onKnit(p.id)}>
                          {p.status === 'knitting' ? '이어서 뜨기' : '따라 뜨기'}
                        </button>
                      )}
                      <button type="button" className="btn btn-sm" onClick={() => setRenaming({ id: p.id, value: p.name })}>이름 바꾸기</button>
                      <button
                        type="button"
                        className="btn btn-sm btn-quiet"
                        onClick={() => setDeleting({ text: `'${p.name}' 도안을 삭제할까요?`, run: () => onDelete(p.id) })}
                      >
                        삭제
                      </button>
                    </>
                  )}
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
                  <button type="button" className="pattern-open no-preview" onClick={() => onGuide(g.id)}>
                    <span className="pattern-copy">
                      <strong>{g.title}</strong>
                      <span className="pattern-progress-copy">{g.done.length} / {total} 완료</span>
                      <progress value={g.done.length} max={total} aria-label="진행률" />
                    </span>
                  </button>
                  <div className="pattern-actions">
                    {renaming?.id === g.id ? renameForm(onRenameGuide) : (
                      <>
                        <button type="button" className="btn btn-sm" onClick={() => setRenaming({ id: g.id, value: g.title })}>이름 바꾸기</button>
                        <button
                          type="button"
                          className="btn btn-sm btn-quiet"
                          onClick={() => setDeleting({ text: `'${g.title}' 풀이를 삭제할까요?`, run: () => onDeleteGuide(g.id) })}
                        >
                          삭제
                        </button>
                      </>
                    )}
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
                    onClick={() => setDeleting({ text: `'${v.title}' 정리를 삭제할까요?`, run: () => onDeleteVideo(v.id) })}
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
