// 실행: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildRequest, parsePalettes, parseVideo, parseGuide, writtenCount, toSeconds, youtubeId, cleanAnswer } from './ai.js'

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

test('영상 해설 요청: 타임스탬프 있는 자막만, 10000자까지 (선택-1)', () => {
  const r = buildRequest({ type: 'video', subtitles: '0:05 안녕하세요\n0:12 사슬 21코를 떠요' })
  assert.match(r.prompt, /사슬 21코/)
  assert.ok(r.schema)
  assert.equal(buildRequest({ type: 'video', subtitles: '타임스탬프 없는 자막' }), null)
  assert.equal(buildRequest({ type: 'video', subtitles: `0:05 ${'가'.repeat(10000)}` }), null)
})

test('영상 해설 답: 시각을 초로, 형식이 틀리면 null (선택-1)', () => {
  const step = (time = '1:05') => ({ time, title: '사슬뜨기', desc: '사슬 21코를 떠요.' })
  const ok = parseVideo(JSON.stringify({ title: '사각 코스터 기초', steps: [step(), step('1:02:03')] }))
  assert.equal(ok.title, '사각 코스터 기초')
  assert.deepEqual(ok.steps.map((s) => s.time), [65, 3723])
  assert.deepEqual(parseVideo('{"title": "", "steps": []}'), { title: '영상 정리', steps: [] })
  assert.equal(parseVideo(JSON.stringify({ steps: [step('1분 5초')] })), null)
  assert.equal(parseVideo(JSON.stringify({ steps: Array(13).fill(step()) })), null)
  assert.equal(parseVideo('{"steps": ['), null)
  assert.equal(toSeconds('0:60'), null)
})

test('유튜브 주소 → 영상 id (선택-1)', () => {
  const id = 'dQw4w9WgXcQ'
  assert.equal(youtubeId(`https://www.youtube.com/watch?v=${id}`), id)
  assert.equal(youtubeId(`https://www.youtube.com/watch?list=x&v=${id}&t=10`), id)
  assert.equal(youtubeId(`https://youtu.be/${id}?si=abc`), id)
  assert.equal(youtubeId(`https://youtube.com/shorts/${id}`), id)
  assert.equal(youtubeId('https://example.com/watch?v=abc'), null)
})

test('도안 풀이 요청: 설명 방식별 지시문, 5000자까지 (선택-2)', () => {
  const r = buildRequest({ type: 'guide', level: 'beginner', text: '1단: 매직링, 짧은뜨기 6 [6]\n2단: 늘리기 (12코)' })
  // 적힌 코 수는 지우고 줄 번호를 붙임: AI가 베끼지 않고 직접 세게
  assert.match(r.prompt, /1: 1단: 매직링, 짧은뜨기 6\n2: 2단: 늘리기$/)
  assert.match(r.system, /처음 잡는다/)
  assert.match(buildRequest({ type: 'guide', level: 'basic', text: '1단' }).system, /짧게/)
  assert.ok(r.schema)
  assert.equal(buildRequest({ type: 'guide', level: 'beginner', text: '  ' }), null)
  assert.equal(buildRequest({ type: 'guide', level: 'pro', text: '1단' }), null)
  assert.equal(buildRequest({ type: 'guide', level: 'basic', text: '가'.repeat(5001) }), null)
})

test('도안 원문의 코 수 읽기: [18], (16코), 없으면 null (선택-2)', () => {
  assert.equal(writtenCount('3단: 사슬뜨기, (짧은뜨기, 늘리기)*6, 빼뜨기 [18]'), 18)
  assert.equal(writtenCount('2단: 짧은뜨기 늘려뜨기 (16코)'), 16)
  assert.equal(writtenCount('7단: [짧은뜨기, 짧은뜨기 2코 모아뜨기]*반복 (8코)'), 8)
  assert.equal(writtenCount('8단: [짧은뜨기 2코 모아뜨기]*반복'), null)
  assert.equal(writtenCount('실 끊고 마무리'), null)
})

test('도안 풀이 답: 원문은 줄 번호로 꺼내고, 형식이 틀리면 null (선택-2)', () => {
  const lines = ['1단: 매직링, 짧은뜨기 6 [6]', '2단: 사슬뜨기,', '  늘리기*6 [12]']
  const row = (label = '1단', from = 1, to = 1) => ({ label, from, to, count: 6, steps: ['매직링을 만들어요.', '고리 안에 **짧은뜨기** 6번'] })
  const parse = (data) => parseGuide(JSON.stringify(data), lines)
  const ok = parse({ title: '작은 공', parts: [{ name: '본체', rows: [row(), row('2단', 2, 3)] }], terms: [{ word: '매직링', desc: '고리' }, { word: '', desc: 'x' }] })
  assert.equal(ok.title, '작은 공')
  assert.equal(ok.parts[0].rows[0].original, '1단: 매직링, 짧은뜨기 6 [6]')
  assert.equal(ok.parts[0].rows[1].original, '2단: 사슬뜨기,\n  늘리기*6 [12]')
  assert.equal(ok.parts[0].rows[0].steps[1], '고리 안에 짧은뜨기 6번')
  assert.deepEqual(ok.terms, [{ word: '매직링', desc: '고리' }])
  assert.deepEqual(parse({ title: '', parts: [], terms: [] }), { title: '도안 풀이', parts: [], terms: [] })
  assert.equal(parse({ parts: [{ name: '본체', rows: [row('1단', 4, 4)] }] }), null) // 없는 줄
  assert.equal(parse({ parts: [{ name: '본체', rows: [row('1단', 3, 2)] }] }), null) // 거꾸로
  assert.equal(parse({ parts: [{ name: '본체', rows: [{ ...row(), count: -1 }] }] }), null)
  assert.equal(parse({ parts: [{ name: '본체', rows: [{ ...row(), steps: [] }] }] }), null)
  assert.equal(parse({ parts: [{ name: '본체', rows: Array(61).fill(row()) }] }), null)
  assert.equal(parseGuide('{"parts": [', lines), null)
})

test('도안 단 묻기 요청: 원문·풀이·질문을 담고, 틀린 값은 거절', () => {
  const body = { type: 'guide-help', level: 'beginner', question: '늘리기는 어디에 해요?', row: { label: '3단', original: '3단: (짧은뜨기, 늘리기)*6 [18]', steps: ['짧은뜨기 1번', '늘리기 1번'] } }
  const r = buildRequest(body)
  assert.match(r.prompt, /도안 원문: 3단: \(짧은뜨기, 늘리기\)\*6 \[18\]/)
  assert.match(r.prompt, /1\. 짧은뜨기 1번\n2\. 늘리기 1번/)
  assert.match(r.system, /지어내지 않는다/)
  assert.equal(buildRequest({ ...body, row: { ...body.row, steps: [] } }), null)
  assert.equal(buildRequest({ ...body, row: { ...body.row, original: '가'.repeat(1001) } }), null)
  assert.equal(buildRequest({ ...body, question: ' ' }), null)
})

test('도우미 1단 질문에는 시작 사슬에 바로 뜨는 법을 붙임', () => {
  assert.match(buildRequest({ ...help, row: { ...help.row, row: 1 } }).prompt, /바늘에서 두 번째 사슬부터/)
  assert.doesNotMatch(buildRequest({ ...help, row: { ...help.row, row: 2 } }).prompt, /1단 시작법/)
})
