// 실행: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { finishedSize, resizeCells, resizeLosesPaint, removeColor } from './pattern.js'

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
