// 실행: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { finishedSize, resizeCells, resizeLosesPaint, removeColor, knitRows, squareRows, startText, withDoneRows } from './pattern.js'
import { templates } from '../templates.js'

const gauge = { stitches: 20, rows: 22 }

test('완성 크기: 20칸·20코 → 10cm, 40단·22단 → 18.2cm', () => {
  assert.deepEqual(finishedSize(20, 40, gauge), { width: 10, height: 18.2 })
  assert.equal(finishedSize(30, 20, gauge).width, 15)
})

// 2×2 격자: 위 줄 [1,2], 아래 줄(1단) [3,4]
const cells = [1, 2, 3, 4]

test('크기 늘리기: 왼쪽 아래 기준, 새 칸은 바탕색', () => {
  assert.deepEqual(resizeCells(cells, 2, 2, 3, 3), [0, 0, 0, 1, 2, 0, 3, 4, 0])
})

test('크기 줄이기: 오른쪽·위쪽이 잘림', () => {
  assert.deepEqual(resizeCells(cells, 2, 2, 1, 1), [3])
  assert.equal(resizeLosesPaint(cells, 2, 2, 1, 1), true)
  assert.equal(resizeLosesPaint([0, 0, 3, 0], 2, 2, 1, 1), false)
})

test('색 지우기: 그 색은 바탕색, 뒤 번호는 당김', () => {
  assert.deepEqual(removeColor([0, 1, 2, 3], 2), [0, 1, 0, 2])
})

const palette = [{ name: '흰색' }, { name: '빨강' }, { name: '노랑' }, { name: '파랑' }, { name: '초록' }]

test('단별 설명: 모든 단의 코 수 합계 = 가로 칸 수', () => {
  for (const t of templates) {
    const rows = knitRows(t)
    assert.equal(rows.length, t.height)
    for (const r of rows) assert.equal(r.runs.reduce((sum, run) => sum + run.count, 0), t.width)
  }
})

test('단별 설명 방향: 2×2 격자에서 1단은 맨 아래 줄 오른쪽부터, 2단은 위 줄 왼쪽부터', () => {
  const [row1, row2] = knitRows({ cells, width: 2, height: 2, palette })
  assert.equal(row1.fromRight, true)
  assert.deepEqual(row1.runs.map((r) => r.name), ['초록', '파랑'])
  assert.equal(row2.fromRight, false)
  assert.deepEqual(row2.runs.map((r) => r.name), ['빨강', '노랑'])
})

test('단별 설명: 한 색만 있는 단은 하나로 묶임, 시작 사슬은 가로 + 1코', () => {
  const [row1] = knitRows({ cells: [1, 1, 1], width: 3, height: 1, palette })
  assert.deepEqual(row1.runs, [{ color: 1, name: '빨강', count: 3 }])
  assert.equal(startText(20), '시작: 사슬 21코')
})

test('체크한 단에 따라 상태 바뀜', () => {
  const p = { height: 2 }
  assert.equal(withDoneRows(p, []).status, 'design')
  assert.equal(withDoneRows(p, [1]).status, 'knitting')
  assert.equal(withDoneRows(p, [1, 2]).status, 'done')
})

test('정사각형 단 수: 20코·게이지 20코 22단 → 22단 (todo 7-4)', () => {
  assert.equal(squareRows(20, gauge), 22)
  assert.equal(squareRows(30, { stitches: 20, rows: 20 }), 30)
})
