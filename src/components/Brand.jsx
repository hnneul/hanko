export function Brand({ compact = false }) {
  return (
    <div className={compact ? 'brand brand-compact' : 'brand'} aria-label="한코한코">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-copy">
        <strong>한코한코</strong>
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
