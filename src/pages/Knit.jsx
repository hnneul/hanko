export default function Knit({ onBack }) {
  return (
    <main className="page">
      <button type="button" className="btn" onClick={onBack}>
        뒤로 가기
      </button>
      <h1>따라 뜨기</h1>
    </main>
  )
}
