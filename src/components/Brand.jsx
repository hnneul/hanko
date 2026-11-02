export function Brand({ compact = false }) {
  return (
    <div className={compact ? 'brand brand-compact' : 'brand'} aria-label="한코한코">
      <span className="brand-mark" aria-hidden="true">
        <img src="/logo-mark-yarn.svg" alt="" />
      </span>
      <span className="brand-copy">
        <strong className="brand-name">
          <span>한코</span>
          <span className="brand-name-accent">한코</span>
        </strong>
        <svg className="brand-thread" viewBox="0 0 124 18" aria-hidden="true">
          <path className="brand-thread-sage" d="M2 2C12 2 13 11 25 11C36 11 43 6 55 7C65 8 70 12 82 11" />
          <path className="brand-thread-peach" d="M81 11C91 11 99 9 104 6C107 4 107 1 104 1C101 1 100 5 102 8C104 11 108 14 108 14C108 14 115 9 115 5C115 1 110 1 108 5C106 10 112 15 122 14" />
        </svg>
        {!compact && <small>YOUR CROCHET STUDIO</small>}
      </span>
    </div>
  )
}

// onHome을 주면 로고를 눌러 내 작업실로 돌아감
export function SiteHeader({ children, onHome }) {
  return (
    <header className="site-header">
      {onHome ? (
        <button type="button" className="brand-home" aria-label="한코한코, 내 작업실로" onClick={onHome}>
          <Brand compact />
        </button>
      ) : (
        <Brand compact />
      )}
      <div className="site-header-actions">{children}</div>
    </header>
  )
}
