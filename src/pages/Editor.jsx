export default function Editor({ onBack, onKnit }) {
  return (
    <main className="page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>도안 편집</h1>
      <button type="button" className="btn" onClick={onKnit}>
        따라 뜨기
      </button>
    </main>
  )
}
