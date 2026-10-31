import { useState } from 'react'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Knit from './pages/Knit.jsx'

// 화면: 'home' → 'editor' → 'knit'
function App() {
  const [page, setPage] = useState('home')

  if (page === 'editor') {
    return <Editor onBack={() => setPage('home')} onKnit={() => setPage('knit')} />
  }
  if (page === 'knit') {
    return <Knit onBack={() => setPage('editor')} />
  }
  return <Home onOpenEditor={() => setPage('editor')} />
}

export default App
