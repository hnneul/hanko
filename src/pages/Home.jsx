export default function Home({ onOpenEditor }) {
  return (
    <main className="page">
      <h1>내 작업실</h1>
      <button type="button" className="btn" onClick={onOpenEditor}>
        새 도안 만들기
      </button>
    </main>
  )
}
