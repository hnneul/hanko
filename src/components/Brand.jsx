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

export function SiteHeader({ children }) {
  return (
    <header className="site-header">
      <Brand compact />
      <div className="site-header-actions">{children}</div>
    </header>
  )
}
