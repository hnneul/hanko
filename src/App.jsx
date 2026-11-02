import { useEffect, useState } from 'react'
import Home from './pages/Home.jsx'
import Level from './pages/Level.jsx'
import Templates from './pages/Templates.jsx'
import Editor from './pages/Editor.jsx'
import Knit from './pages/Knit.jsx'
import Video from './pages/Video.jsx'
import { createPattern } from './lib/pattern.js'
import { loadPatterns, savePatterns, loadLevel, saveLevel, loadView, saveView, removeChat, loadVideos, saveVideos } from './lib/storage.js'

// 화면: 'home' → 'templates' → 'editor' → 'knit', 'home' → 'video'(영상 해설)
// 수준을 아직 안 골랐으면 어느 화면이든 수준 선택부터 (PRD #4-1)
const saved = loadView()

function App() {
  const [page, setPage] = useState(saved.page)
  const [patterns, setPatterns] = useState(loadPatterns)
  const [openId, setOpenId] = useState(saved.openId)
  const [knitFrom, setKnitFrom] = useState(saved.knitFrom) // 따라 뜨기에서 뒤로 가면 돌아갈 화면
  const [level, setLevel] = useState(loadLevel)
  const [videos, setVideos] = useState(loadVideos) // 영상으로 배운 것 (선택-1)
  const pattern = patterns.find((p) => p.id === openId)

  // 도안이 바뀔 때마다 자동 저장 (PRD #4-6)
  useEffect(() => savePatterns(patterns), [patterns])
  useEffect(() => saveVideos(videos), [videos])

  // 새로고침해도 보던 화면으로 (todo 7-2)
  useEffect(() => saveView({ page, openId, knitFrom }), [page, openId, knitFrom])

  // 화면을 바꾸면 이전 화면의 스크롤 위치를 이어받지 않도록 맨 위에서 시작
  // (영상 정리를 저장하며 openId만 바뀔 때는 그대로)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

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
        onHome={() => setPage('home')}
        onPick={(t) => {
          const p = createPattern(t)
          setPatterns((list) => [p, ...list])
          setOpenId(p.id)
          setPage('editor')
        }}
      />
    )
  }
  if (page === 'video') {
    return (
      <Video
        saved={videos.find((v) => v.id === openId)}
        onSave={(v) => {
          setVideos((list) => [v, ...list.filter((x) => x.id !== v.id)])
          setOpenId(v.id)
        }}
        onBack={() => setPage('home')}
        onHome={() => setPage('home')}
      />
    )
  }
  if (page === 'editor' && pattern) {
    return (
      <Editor
        pattern={pattern}
        onChange={(p) => updatePattern({ ...p, updatedAt: Date.now() })}
        onBack={() => setPage('home')}
        onHome={() => setPage('home')}
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
        level={level}
        onChange={(p) => updatePattern({ ...p, updatedAt: Date.now() })}
        onBack={() => setPage(knitFrom)}
        onHome={() => setPage('home')}
        onComplete={() => setPage('home')}
      />
    )
  }
  return (
    <Home
      patterns={patterns}
      level={level}
      onNew={() => setPage('templates')}
      videos={videos}
      onVideo={(id = null) => {
        setOpenId(id)
        setPage('video')
      }}
      onDeleteVideo={(id) => setVideos((list) => list.filter((v) => v.id !== id))}
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
      onDelete={(id) => {
        setPatterns((list) => list.filter((p) => p.id !== id))
        removeChat(id)
      }}
      onLevel={chooseLevel}
    />
  )
}

export default App
