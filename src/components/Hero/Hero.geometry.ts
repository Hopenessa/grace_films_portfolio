type Point = { x: number; y: number; dx: number; dy: number };
type Gap = { y: number; height: number; scale: number };
const curves = [
  [
    [270, -310],
    [165, -205],
    [-14, -10],
    [-14, 220],
  ],
  [
    [-14, 220],
    [-14, 385],
    [70, 485],
    [240, 640],
  ],
];
function pointAt(position: number): Point {
  const index = Math.min(1, Math.floor(position));
  const t = position - index,
    u = 1 - t;
  const [a, b, c, d] = curves[index];
  return {
    x:
      u * u * u * a[0] +
      3 * u * u * t * b[0] +
      3 * u * t * t * c[0] +
      t * t * t * d[0],
    y:
      u * u * u * a[1] +
      3 * u * u * t * b[1] +
      3 * u * t * t * c[1] +
      t * t * t * d[1],
    dx:
      3 * u * u * (b[0] - a[0]) +
      6 * u * t * (c[0] - b[0]) +
      3 * t * t * (d[0] - c[0]),
    dy:
      3 * u * u * (b[1] - a[1]) +
      6 * u * t * (c[1] - b[1]) +
      3 * t * t * (d[1] - c[1]),
  };
}
function positionAtY(y: number) {
  let low = 0,
    high = 2;
  for (let i = 0; i < 40; i++) {
    const middle = (low + high) / 2;
    if (pointAt(middle).y < y) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}
export function taperedArc(gap: Gap): string {
  const sections =
    gap.height > 0
      ? [
          [0, positionAtY(gap.y)],
          [positionAtY(gap.y + gap.height), 2],
        ]
      : [[0, 2]];
  return sections
    .map(([start, end], section) => {
      const left: string[] = [],
        right: string[] = [];
      for (let i = 0; i <= 180; i++) {
        const p = pointAt(start + ((end - start) * i) / 180);
        const distance =
          gap.height > 0
            ? (section === 0 ? gap.y - p.y : p.y - gap.y - gap.height) *
              gap.scale
            : 26;
        const amount = Math.max(0, Math.min(1, distance / 26));
        const halfWidth =
          (0.75 / gap.scale) * amount * amount * (3 - 2 * amount);
        const length = Math.hypot(p.dx, p.dy);
        const nx = (-p.dy / length) * halfWidth,
          ny = (p.dx / length) * halfWidth;
        left.push(`${(p.x + nx).toFixed(3)},${(p.y + ny).toFixed(3)}`);
        right.push(`${(p.x - nx).toFixed(3)},${(p.y - ny).toFixed(3)}`);
      }
      return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
    })
    .join(" ");
}
