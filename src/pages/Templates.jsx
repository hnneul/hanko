import { templates } from '../templates.js'
import { DEFAULT_GAUGE } from '../config.js'
import Preview from '../components/Preview.jsx'

export default function Templates({ onBack, onPick }) {
  return (
    <main className="page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>템플릿 고르기</h1>
      <p className="muted">마음에 드는 템플릿을 고르면 그 무늬로 새 도안이 만들어져요.</p>
      <div className="template-list">
        {templates.map((t) => (
          <button key={t.id} type="button" className="card template-card" onClick={() => onPick(t)}>
            <Preview pattern={{ ...t, gauge: DEFAULT_GAUGE }} maxWidth={160} />
            <h3>{t.name}</h3>
            <p className="muted">
              {t.width} × {t.height}칸 · {t.palette.length}색
            </p>
          </button>
        ))}
      </div>
    </main>
  )
}
