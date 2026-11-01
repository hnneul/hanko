// 기본 템플릿 2종의 배색과 무늬 (PRD #4-2)
import { TEMPLATES } from './config.js'

function drawCells(width, height, colorAt) {
  const cells = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) cells.push(colorAt(x, y))
  }
  return cells
}

// 하트 곡선 (x² + y² − 1)³ − x²y³ ≤ 0 안쪽을 칠함
function heart(x, y) {
  const u = (x + 0.5 - 10) / 7
  const v = (11 - (y + 0.5)) / 7
  return (u * u + v * v - 1) ** 3 - u * u * v ** 3 <= 0 ? 1 : 0
}

// 봉우리 두 개짜리 산, 18번째 줄보다 위는 눈
function mountains(x, y) {
  const peak = (px, top, slope) => top + Math.abs(x - px) * slope
  const top = Math.min(peak(9, 12, 1.1), peak(21, 17, 0.9))
  if (y < top) return 0
  return y < 18 ? 2 : 1
}

const looks = {
  coaster: {
    palette: [
      { name: '흰색', hex: '#fdfbf6' },
      { name: '딸기색', hex: '#d9576b' },
    ],
    colorAt: heart,
  },
  tapestry: {
    palette: [
      { name: '하늘색', hex: '#cfe3ec' },
      { name: '숲색', hex: '#6f8f6b' },
      { name: '눈색', hex: '#ffffff' },
    ],
    colorAt: mountains,
  },
}

const patterned = TEMPLATES.map((t) => ({
  ...t,
  palette: looks[t.id].palette,
  cells: drawCells(t.width, t.height, looks[t.id].colorAt),
}))

// 처음부터 그리고 싶을 때: 같은 크기, 배색은 흰 바탕색 하나만, 무늬 없음
const blank = patterned.map((t) => ({
  ...t,
  id: `${t.id}-blank`,
  name: `빈 ${t.name}`,
  blank: true,
  palette: [{ name: '흰색', hex: '#fdfbf6' }],
  cells: t.cells.map(() => 0),
}))

export const templates = [...patterned, ...blank]
