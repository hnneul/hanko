// 실행: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { loadPatterns, savePatterns, loadLevel, saveLevel, loadView, saveView } from './storage.js'
import { progress } from './pattern.js'

// localStorage 대신 쓰는 가짜 저장소
function fakeStorage(data = {}) {
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => (data[k] = String(v)),
  }
}

const pattern = {
  id: 'a',
  name: '사각 코스터',
  templateId: 'coaster',
  width: 5,
  height: 5,
  palette: [
    { name: '흰색', hex: '#ffffff' },
    { name: '빨강', hex: '#cc3333' },
  ],
  cells: Array(25).fill(1),
  gauge: { stitches: 20, rows: 22 },
  doneRows: [1, 2],
  status: 'knitting',
  updatedAt: 1,
}

test('도안 저장 후 다시 읽기 (새로고침)', () => {
  const s = fakeStorage()
  savePatterns([pattern, { ...pattern, id: 'b' }], s)
  assert.deepEqual(loadPatterns(s), [pattern, { ...pattern, id: 'b' }])
})

test('저장값이 없거나 망가졌으면 빈 목록', () => {
  assert.deepEqual(loadPatterns(fakeStorage()), [])
  assert.deepEqual(loadPatterns(fakeStorage({ 'hanko:patterns': '{망가짐' })), [])
  assert.deepEqual(loadPatterns(fakeStorage({ 'hanko:patterns': '{"a":1}' })), [])
  assert.deepEqual(loadPatterns(fakeStorage({ 'hanko:patterns': 'null' })), [])
})

test('망가진 도안만 빼고 읽기', () => {
  const broken = [
    null,
    { ...pattern, cells: [1, 2] }, // 칸 수가 안 맞음
    { ...pattern, cells: Array(25).fill(9) }, // 없는 배색 번호
    { ...pattern, gauge: { stitches: 0, rows: 22 } },
    { ...pattern, status: '???' },
  ]
  const s = fakeStorage({ 'hanko:patterns': JSON.stringify([...broken, pattern]) })
  assert.deepEqual(loadPatterns(s), [pattern])
})

test('저장이 실패해도 에러 없음', () => {
  const full = { setItem: () => { throw new Error('QuotaExceededError') } }
  assert.doesNotThrow(() => savePatterns([pattern], full))
})

test('수준 저장·읽기, 모르는 값은 null', () => {
  const s = fakeStorage()
  assert.equal(loadLevel(s), null)
  saveLevel('basic', s)
  assert.equal(loadLevel(s), 'basic')
  assert.equal(loadLevel(fakeStorage({ 'hanko:level': '"expert"' })), null)
  assert.equal(loadLevel(fakeStorage({ 'hanko:level': '망가짐' })), null)
})

test('진행률: 5단 중 2단 → 40%', () => {
  assert.equal(progress(pattern), 40)
})

test('보던 화면 저장 후 다시 읽기, 모르는 값이면 내 작업실 (todo 7-2)', () => {
  const s = fakeStorage()
  assert.deepEqual(loadView(s), { page: 'home', openId: null, knitFrom: 'home' })
  saveView({ page: 'knit', openId: 'a', knitFrom: 'editor' }, s)
  assert.deepEqual(loadView(s), { page: 'knit', openId: 'a', knitFrom: 'editor' })
  assert.equal(loadView(fakeStorage({ 'hanko:view': '{"page":"x"}' })).page, 'home')
  assert.equal(loadView(fakeStorage({ 'hanko:view': '{망가짐' })).page, 'home')
})
