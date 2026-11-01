import { useState } from 'react'
import { AI_QUESTION_MAX, FAQ } from '../config.js'
import { askAI } from '../lib/ai.js'

// AI 도우미 채팅 (PRD #4-5). 대화는 저장하지 않음, 새로고침하면 사라짐 (PRD #9)
export default function Helper({ pattern, level, row }) {
  const [messages, setMessages] = useState([]) // [{ me: true/false, text }]
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function ask(q) {
    q = q.trim()
    if (!q || loading) return
    setMessages((list) => [...list, { me: true, text: q }])
    setQuestion('')
    setError('')
    setLoading(true)
    try {
      // 수준·도안·지금 단을 함께 보냄. 지시문은 서버가 만듦
      const { answer } = await askAI({
        type: 'help',
        level,
        question: q,
        pattern: {
          width: pattern.width,
          height: pattern.height,
          colors: pattern.palette.map((c) => c.name),
          doneCount: pattern.doneRows.length,
        },
        row: row && {
          row: row.row,
          fromRight: row.fromRight,
          runs: row.runs.map((r) => ({ name: r.name, count: r.count })),
        },
      })
      setMessages((list) => [...list, { me: false, text: answer }])
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="card helper">
      <h3>AI 도우미</h3>
      <div className="faq">
        {FAQ.map((q) => (
          <button key={q} type="button" className="btn btn-sm" disabled={loading} onClick={() => ask(q)}>
            {q}
          </button>
        ))}
      </div>
      {messages.length > 0 && (
        <ul className="chat" aria-live="polite">
          {messages.map((m, i) => (
            <li key={i} className={m.me ? 'chat-me' : 'chat-ai'}>
              {m.text}
            </li>
          ))}
        </ul>
      )}
      {loading && <p className="muted">답을 생각하고 있어요…</p>}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <form
        className="ask"
        onSubmit={(e) => {
          e.preventDefault()
          ask(question)
        }}
      >
        <input
          className="text-input"
          value={question}
          maxLength={AI_QUESTION_MAX}
          placeholder="뜨다가 막히면 물어보세요"
          onChange={(e) => setQuestion(e.target.value)}
          aria-label="AI 도우미에게 질문"
        />
        <button type="submit" className="btn btn-primary" disabled={loading || !question.trim()}>
          묻기
        </button>
      </form>
    </div>
  )
}
