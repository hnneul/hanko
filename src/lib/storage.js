// localStorage에 도안 목록·수준 저장, sessionStorage에 보던 화면 저장 (PRD #7)
// 저장값이 망가져 있으면 에러 없이 빈 상태로 시작
// storage는 테스트에서 가짜를 넘길 수 있게 인자로 받음

import { GRID_MIN, GRID_MAX, MAX_COLORS, LEVELS, CHAT_KEEP } from '../config.js'

const PATTERNS_KEY = 'hanko:patterns'
const LEVEL_KEY = 'hanko:level'
const VIEW_KEY = 'hanko:view'
const PAGES = ['home', 'templates', 'editor', 'knit', 'video']
const chatKey = (id) => `hanko:chat:${id}`
const STATUSES = ['design', 'knitting', 'done']

const isInt = (n, min, max) => Number.isInteger(n) && n >= min && n <= max

// 화면이 멈추지 않을 만큼만 확인: 크기, 칸 수, 칸의 배색 번호, 게이지
export function isValidPattern(p) {
  return (
    typeof p === 'object' &&
    p !== null &&
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    isInt(p.width, GRID_MIN, GRID_MAX) &&
    isInt(p.height, GRID_MIN, GRID_MAX) &&
    Array.isArray(p.palette) &&
    isInt(p.palette.length, 1, MAX_COLORS) &&
    p.palette.every((c) => typeof c?.hex === 'string' && typeof c?.name === 'string') &&
    Array.isArray(p.cells) &&
    p.cells.length === p.width * p.height &&
    p.cells.every((c) => isInt(c, 0, p.palette.length - 1)) &&
    p.gauge?.stitches > 0 &&
    p.gauge?.rows > 0 &&
    Array.isArray(p.doneRows) &&
    STATUSES.includes(p.status)
  )
}

// 사이트 데이터가 막힌 브라우저는 localStorage를 읽기만 해도 에러가 나서 try 안에서 꺼냄
function read(storage, key, session) {
  try {
    return JSON.parse((storage ?? (session ? sessionStorage : localStorage)).getItem(key))
  } catch {
    return null
  }
}

function write(storage, key, value, session) {
  try {
    (storage ?? (session ? sessionStorage : localStorage)).setItem(key, JSON.stringify(value))
  } catch {
    // 저장 공간이 꽉 찼거나 막힌 브라우저: 화면은 그대로 씀
  }
}

// 망가진 도안은 빼고, 목록 자체가 망가졌으면 빈 목록
export function loadPatterns(storage) {
  const list = read(storage, PATTERNS_KEY)
  return Array.isArray(list) ? list.filter(isValidPattern) : []
}

export function savePatterns(patterns, storage) {
  write(storage, PATTERNS_KEY, patterns)
}

// 아직 고르지 않았거나 망가졌으면 null → 수준 선택 화면
export function loadLevel(storage) {
  const level = read(storage, LEVEL_KEY)
  return LEVELS.some((l) => l.id === level) ? level : null
}

export function saveLevel(level, storage) {
  write(storage, LEVEL_KEY, level)
}

// 새로고침해도 보던 화면으로 (todo 7-2). 탭을 닫으면 사라지도록 sessionStorage
// 열린 도안이 지워졌으면 App이 내 작업실을 보여 줌
export function loadView(storage) {
  const v = read(storage, VIEW_KEY, true)
  if (!PAGES.includes(v?.page)) return { page: 'home', openId: null, knitFrom: 'home' }
  return {
    page: v.page,
    openId: typeof v.openId === 'string' ? v.openId : null,
    knitFrom: v.knitFrom === 'editor' ? 'editor' : 'home',
  }
}

export function saveView(view, storage) {
  write(storage, VIEW_KEY, view, true)
}

// AI 도우미 대화, 도안마다 최근 CHAT_KEEP개만 (todo 7-5). 망가진 메시지는 뺌
export function loadChat(id, storage) {
  const list = read(storage, chatKey(id))
  return Array.isArray(list) ? list.filter((m) => typeof m?.me === 'boolean' && typeof m?.text === 'string') : []
}

export function saveChat(id, messages, storage) {
  write(storage, chatKey(id), messages.slice(-CHAT_KEEP))
}

export function removeChat(id, storage) {
  try {
    (storage ?? localStorage).removeItem(chatKey(id))
  } catch {
    // 막힌 브라우저: 지울 것도 없음
  }
}
