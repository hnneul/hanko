// 격자선 없는 완성품 미리보기. 칸 비율은 게이지에 맞춤 (PRD #9)
export default function Preview({ pattern, maxWidth = 280 }) {
  const { width, height, cells, palette, gauge } = pattern
  const w = 1 / gauge.stitches
  const h = 1 / gauge.rows
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
    </svg>
  )
}
