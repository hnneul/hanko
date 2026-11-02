// 격자선 없는 완성품 미리보기. 칸 비율은 게이지에 맞춤 (PRD #9)
// 따라 뜨기에서는 끝낸 단을 흐리게, 지금 단(currentRow)에 테두리 (PRD #4-4)
export default function Preview({ pattern, maxWidth = 280, currentRow, doneRows = [], showGrid = false }) {
  const { width, height, cells, palette, gauge } = pattern
  const w = 1 / gauge.stitches
  const h = 1 / gauge.rows
  const rowY = (row) => (height - row) * h
  return (
    <svg
      className="preview"
      viewBox={`0 0 ${width * w} ${height * h}`}
      style={{ maxWidth }}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`${pattern.name} 미리보기`}
    >
      {cells.map((c, i) => (
        <rect
          key={i}
          x={(i % width) * w}
          y={Math.floor(i / width) * h}
          width={w}
          height={h}
          fill={palette[c].hex}
        />
      ))}
      {showGrid && (
        <g stroke="#d9d2c8" strokeWidth="0.7">
          {Array.from({ length: width + 1 }, (_, x) => (
            <line key={`x${x}`} x1={x * w} y1="0" x2={x * w} y2={height * h} vectorEffect="non-scaling-stroke" />
          ))}
          {Array.from({ length: height + 1 }, (_, y) => (
            <line key={`y${y}`} x1="0" y1={y * h} x2={width * w} y2={y * h} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      )}
      {doneRows.map((row) => (
        <rect key={`d${row}`} y={rowY(row)} width={width * w} height={h} fill="#fff" opacity="0.55" />
      ))}
      {currentRow && (
        <rect
          y={rowY(currentRow)}
          width={width * w}
          height={h}
          fill="none"
          stroke="#403e3a"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )
}
