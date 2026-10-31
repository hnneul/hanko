// 앱 전체에서 조절하는 값 (PRD #7)

export const TEMPLATES = [
  { id: 'coaster', name: '사각 코스터', width: 20, height: 20 },
  { id: 'tapestry', name: '태피스트리 벽걸이', width: 30, height: 40 },
]

// 10cm당 코 수·단 수
export const DEFAULT_GAUGE = { stitches: 20, rows: 22 }

export const MAX_COLORS = 6

export const GRID_MIN = 5
export const GRID_MAX = 60

// 사용자 수준 (PRD #4-1)
export const LEVELS = [
  { id: 'beginner', name: '완전 초보', desc: '코바늘을 처음 잡아요. 차근차근 설명해 주세요.' },
  { id: 'basic', name: '기초는 앎', desc: '사슬뜨기·짧은뜨기는 할 줄 알아요.' },
]
