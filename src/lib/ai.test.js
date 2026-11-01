// 실행: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRequest, parsePalettes, cleanAnswer } from './ai.js'

const help = {
  type: 'help',
  level: 'beginner',
  question: '이 단 어떻게 떠요?',
  pattern: { width: 20, height: 20, colors: ['흰색', '딸기색'], doneCount: 3 },
  row: { row: 4, fromRight: false, runs: [{ name: '흰색', count: 8 }, { name: '딸기색', count: 4 }, { name: '흰색', count: 8 }] },
}

test('도우미 요청: 지금 단의 방향·색·코 수와 수준 지시문이 들어감', () => {
  const r = buildRequest(help)
  assert.match(r.prompt, /4단, 왼쪽 → 오른쪽으로, 뜨는 순서: 흰색 8코 → 딸기색 4코 → 흰색 8코/)
  assert.match(r.prompt, /질문: 이 단 어떻게 떠요\?/)
  assert.match(r.system, /완전 초보/)
  assert.match(buildRequest({ ...help, level: 'basic' }).system, /짧게/)
})

test('도우미 요청: 정해진 값이 아니면 거절', () => {
  assert.equal(buildRequest({ ...help, question: 'a'.repeat(201) }), null) // 200자 제한
  assert.equal(buildRequest({ ...help, question: '   ' }), null)
  assert.equal(buildRequest({ ...help, level: 'expert' }), null)
  assert.equal(buildRequest({ ...help, row: { ...help.row, runs: [{ name: '흰색', count: 'x' }] } }), null)
  assert.equal(buildRequest({ type: 'prompt', text: '아무거나' }), null)
  assert.equal(buildRequest(null), null)
  // 다 뜬 도안은 지금 단 없이
  assert.match(buildRequest({ ...help, row: null }).prompt, /지금 단: 없음/)
})

test('배색 요청: 분위기와 색 수 검사, JSON 형식으로', () => {
  const r = buildRequest({ type: 'palette', mood: '봄 느낌으로', count: 2 })
  assert.match(r.prompt, /봄 느낌으로[\s\S]*2개/)
  assert.ok(r.schema)
  assert.equal(buildRequest({ type: 'palette', mood: '봄', count: 7 }), null)
  assert.equal(buildRequest({ type: 'palette', mood: '', count: 2 }), null)
})

test('배색 답: 3안·색 수·#rrggbb가 맞을 때만', () => {
  const plan = (hex = '#FFB7C5') => ({ name: '벚꽃', colors: [{ name: '흰색', hex: '#ffffff' }, { name: '분홍', hex }] })
  const ok = parsePalettes(JSON.stringify({ palettes: [plan(), plan(), plan()] }), 2)
  assert.equal(ok.length, 3)
  assert.equal(ok[0].colors[1].hex, '#ffb7c5')
  assert.equal(parsePalettes(JSON.stringify({ palettes: [plan(), plan()] }), 2), null)
  assert.equal(parsePalettes(JSON.stringify({ palettes: [plan(), plan(), plan()] }), 3), null)
  assert.equal(parsePalettes(JSON.stringify({ palettes: [plan('pink'), plan(), plan()] }), 2), null)
  assert.equal(parsePalettes('{"palettes": [', 2), null)
})

test('도우미 답: 별표 빼고 길이 제한', () => {
  assert.equal(cleanAnswer('**짧은뜨기**는요'), '짧은뜨기는요')
  assert.equal(cleanAnswer('가'.repeat(700)).length, 601)
  assert.equal(cleanAnswer(''), null)
})
