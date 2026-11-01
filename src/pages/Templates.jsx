import { templates } from '../templates.js'
import { DEFAULT_GAUGE } from '../config.js'
import Preview from '../components/Preview.jsx'
import { SiteHeader } from '../components/Brand.jsx'

const GROUPS = [
  { title: '빈 격자로 시작', desc: '바탕색만 칠해진 격자에 처음부터 내 무늬를 그려요.', blank: true },
  { title: '무늬 템플릿', desc: '무늬가 칠해진 템플릿을 골라 색과 모양을 바꿔요.', blank: false },
]

export default function Templates({ onBack, onPick }) {
  return (
    <main className="page templates-page">
      <SiteHeader>
        <button type="button" className="btn btn-sm" onClick={onBack}>← 내 작업실</button>
      </SiteHeader>

      <div className="page-intro">
        <p className="eyebrow">START A NEW PATTERN</p>
        <h1>어떻게 시작할까요?</h1>
        <p>처음부터 자유롭게 그리거나, 준비된 무늬를 내 취향으로 바꿔 보세요.</p>
      </div>

      {GROUPS.map((g) => (
        <section key={g.title} className="template-group">
          <div className="template-group-head">
            <div>
              <h2>{g.title}</h2>
              <p>{g.desc}</p>
            </div>
            <span className="count-pill">2가지</span>
          </div>
          <div className="template-list">
            {templates
              .filter((t) => !!t.blank === g.blank)
              .map((t) => (
                <button key={t.id} type="button" className="card template-card" onClick={() => onPick(t)}>
                  <span className="template-preview"><Preview pattern={{ ...t, gauge: DEFAULT_GAUGE }} maxWidth={190} /></span>
                  <span className="template-copy">
                    <span className="template-type">{t.blank ? 'BLANK GRID' : 'PATTERN'}</span>
                    <strong>{t.name}</strong>
                    <span>{t.width} × {t.height}칸 · {t.palette.length}색</span>
                  </span>
                  <span className="template-arrow" aria-hidden="true">→</span>
                </button>
              ))}
          </div>
        </section>
      ))}
    </main>
  )
}
