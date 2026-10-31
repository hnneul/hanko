import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Level from './pages/Level.jsx'
import Templates from './pages/Templates.jsx'
import Editor from './pages/Editor.jsx'
import Knit from './pages/Knit.jsx'
import { createPattern } from './lib/pattern.js'
import { loadPatterns, savePatterns, loadLevel, saveLevel } from './lib/storage.js'

// 화면: 'home' → 'templates' → 'editor' → 'knit'
// 수준을 아직 안 골랐으면 어느 화면이든 수준 선택부터 (PRD #4-1)
function App() {
  const [page, setPage] = useState('home')
  const [patterns, setPatterns] = useState(loadPatterns)
  const [openId, setOpenId] = useState(null)
  const [knitFrom, setKnitFrom] = useState('home') // 따라 뜨기에서 뒤로 가면 돌아갈 화면
  const [level, setLevel] = useState(loadLevel)
  const pattern = patterns.find((p) => p.id === openId)

  // 도안이 바뀔 때마다 자동 저장 (PRD #4-6)
  useEffect(() => savePatterns(patterns), [patterns])

  function chooseLevel(id) {
    setLevel(id)
    saveLevel(id)
  }

  function updatePattern(next) {
    setPatterns((list) => list.map((p) => (p.id === next.id ? next : p)))
  }

  if (!level) {
    return <Level onPick={chooseLevel} />
  }
  if (page === 'templates') {
    return (
      <Templates
        onBack={() => setPage('home')}
        onPick={(t) => {
          const p = createPattern(t)
          setPatterns((list) => [p, ...list])
          setOpenId(p.id)
          setPage('editor')
        }}
      />
    )
  }
  if (page === 'editor' && pattern) {
    return (
      <Editor
        pattern={pattern}
        onChange={(p) => updatePattern({ ...p, updatedAt: Date.now() })}
        onBack={() => setPage('home')}
        onKnit={() => {
          setKnitFrom('editor')
          setPage('knit')
        }}
      />
    )
  }
  if (page === 'knit' && pattern) {
    return (
      <Knit
        pattern={pattern}
        onChange={(p) => updatePattern({ ...p, updatedAt: Date.now() })}
        onBack={() => setPage(knitFrom)}
      />
    )
  }
  return (
    <Home
      patterns={patterns}
      level={level}
      onNew={() => setPage('templates')}
      onOpen={(id) => {
        setOpenId(id)
        setPage('editor')
      }}
      onKnit={(id) => {
        setOpenId(id)
        setKnitFrom('home')
        setPage('knit')
      }}
      onRename={(id, name) => updatePattern({ ...patterns.find((p) => p.id === id), name, updatedAt: Date.now() })}
      onDelete={(id) => setPatterns((list) => list.filter((p) => p.id !== id))}
      onLevel={chooseLevel}
    />
  )
}

export default App
