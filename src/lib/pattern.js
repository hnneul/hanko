// 도안 데이터 다루는 함수 (PRD #7 저장 형식)
// cells: 맨 위 줄부터 왼쪽→오른쪽, 칸마다 배색 번호

import { DEFAULT_GAUGE } from '../config.js'

export function createPattern(template) {
  return {
    id: crypto.randomUUID(),
    name: template.name,
    templateId: template.id,
    width: template.width,
    height: template.height,
    palette: template.palette.map((c) => ({ ...c })),
    cells: [...template.cells],
    gauge: { ...DEFAULT_GAUGE },
    doneRows: [],
    status: 'design',
    updatedAt: Date.now(),
  }
}

// 완성 크기(cm), 소수 첫째 자리까지 (PRD #4-2)
export function finishedSize(width, height, gauge) {
  const round = (n) => Math.round(n * 10) / 10
  return {
    width: round((width / gauge.stitches) * 10),
    height: round((height / gauge.rows) * 10),
  }
}

// 가로 칸 수 그대로 완성품이 정사각형이 되는 단 수 (todo 7-4)
export function squareRows(width, gauge) {
  return Math.round((width * gauge.rows) / gauge.stitches)
}

// 왼쪽 아래(1단 시작점) 기준으로 크기 바꾸기. 새로 생긴 칸은 바탕색(0) (PRD #9)
export function resizeCells(cells, width, height, newWidth, newHeight) {
  const shift = newHeight - height
  const next = []
  for (let y = 0; y < newHeight; y++) {
    const oldY = y - shift
    for (let x = 0; x < newWidth; x++) {
      const inside = oldY >= 0 && oldY < height && x < width
      next.push(inside ? cells[oldY * width + x] : 0)
    }
  }
  return next
}

// 크기를 줄일 때 칠한 칸(바탕색이 아닌 칸)이 잘리는지
export function resizeLosesPaint(cells, width, height, newWidth, newHeight) {
  const shift = newHeight - height
  return cells.some((c, i) => {
    if (c === 0) return false
    const x = i % width
    const y = Math.floor(i / width) + shift
    return x >= newWidth || y < 0
  })
}

// 배색에서 색 하나 지우기: 그 색 칸은 바탕색으로, 뒤 번호는 한 칸씩 당김 (PRD #9)
export function removeColor(cells, index) {
  return cells.map((c) => (c === index ? 0 : c > index ? c - 1 : c))
}

// 진행률(%): 체크한 단 수 / 전체 단 수 (PRD #4-6)
export function progress(pattern) {
  return Math.round((pattern.doneRows.length / pattern.height) * 100)
}

// 단별 설명 (PRD #4-4, #9): 맨 아래 줄이 1단, 앞면 기준 홀수 단은 오른쪽→왼쪽·짝수 단은 왼쪽→오른쪽
// 같은 색이 이어지면 묶음. [{ row, fromRight, runs: [{ color, name, count }] }]
export function knitRows({ cells, width, height, palette }) {
  const rows = []
  for (let row = 1; row <= height; row++) {
    const start = (height - row) * width
    const line = cells.slice(start, start + width)
    const fromRight = row % 2 === 1
    if (fromRight) line.reverse()
    const runs = []
    for (const color of line) {
      const last = runs.at(-1)
      if (last?.color === color) last.count++
      else runs.push({ color, name: palette[color].name, count: 1 })
    }
    rows.push({ row, fromRight, runs })
  }
  return rows
}

// 기초 사슬: 가로 칸 수 + 짧은뜨기 기둥코 1코 (PRD #9)
export function startText(width) {
  return `시작: 사슬 ${width + 1}코`
}

// 체크한 단이 바뀌면 상태도 같이: 0단 → 디자인 중, 일부 → 뜨는 중, 전부 → 완성 (PRD #4-6)
export function withDoneRows(pattern, doneRows) {
  const status = doneRows.length === 0 ? 'design' : doneRows.length >= pattern.height ? 'done' : 'knitting'
  return { ...pattern, doneRows, status }
}
