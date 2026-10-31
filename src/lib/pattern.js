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
