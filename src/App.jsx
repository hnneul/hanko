import { useState } from 'react'
import Home from './pages/Home.jsx'
import Templates from './pages/Templates.jsx'
import Editor from './pages/Editor.jsx'
import Knit from './pages/Knit.jsx'
import { createPattern } from './lib/pattern.js'

// 화면: 'home' → 'templates' → 'editor' → 'knit'
function App() {
  const [page, setPage] = useState('home')
  const [pattern, setPattern] = useState(null)

  if (page === 'templates') {
    return (
      <Templates
        onBack={() => setPage('home')}
        onPick={(t) => {
          setPattern(createPattern(t))
          setPage('editor')
        }}
      />
    )
  }
  if (page === 'editor' && pattern) {
    return (
      <Editor
        pattern={pattern}
        onChange={(p) => setPattern({ ...p, updatedAt: Date.now() })}
        onBack={() => setPage('home')}
        onKnit={() => setPage('knit')}
      />
    )
  }
  if (page === 'knit') {
    return <Knit onBack={() => setPage('editor')} />
  }
  return <Home onOpenEditor={() => setPage('templates')} />
}

export default App
