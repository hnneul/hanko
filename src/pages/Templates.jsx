import { templates } from '../templates.js'
import { DEFAULT_GAUGE } from '../config.js'
import Preview from '../components/Preview.jsx'

const GROUPS = [
  { title: '빈 격자로 시작', desc: '바탕색만 칠해진 격자에 처음부터 내 무늬를 그려요.', blank: true },
  { title: '무늬 템플릿', desc: '무늬가 칠해진 템플릿을 골라 색과 모양을 바꿔요.', blank: false },
]

export default function Templates({ onBack, onPick }) {
  return (
    <main className="page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>템플릿 고르기</h1>
      {GROUPS.map((g) => (
        <section key={g.title} className="template-group">
          <h2>{g.title}</h2>
          <p className="muted">{g.desc}</p>
          <div className="template-list">
            {templates
              .filter((t) => !!t.blank === g.blank)
              .map((t) => (
                <button key={t.id} type="button" className="card template-card" onClick={() => onPick(t)}>
                  <Preview pattern={{ ...t, gauge: DEFAULT_GAUGE }} maxWidth={160} />
                  <h3>{t.name}</h3>
                  <p className="muted">
                    {t.width} × {t.height}칸 · {t.palette.length}색
                  </p>
                </button>
              ))}
          </div>
        </section>
      ))}
    </main>
  )
}
