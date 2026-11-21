// أدوات رسم الزخارف الهندسية

/** نجمة n رؤوس (رؤوس خارجية بنصف قطر R وداخلية r) كسلسلة نقاط لـ SVG polygon */
export const starPoints = (
  cx: number,
  cy: number,
  R: number,
  r: number,
  n: number,
  rotationDeg = 0
): string => {
  const pts: string[] = [];
  const rot = (rotationDeg * Math.PI) / 180;
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = rot - Math.PI / 2 + (i * Math.PI) / n;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};

/** خاتم سليمان: مربعان متداخلان — نصف القطر الداخلي المناسب */
export const KHATAM_INNER = Math.cos(Math.PI / 4) / Math.cos(Math.PI / 8);

/** مضلع منتظم */
export const polygonPoints = (cx: number, cy: number, R: number, n: number, rotationDeg = 0) => {
  const pts: string[] = [];
  const rot = (rotationDeg * Math.PI) / 180;
  for (let i = 0; i < n; i++) {
    const a = rot - Math.PI / 2 + (i * 2 * Math.PI) / n;
    pts.push(`${(cx + R * Math.cos(a)).toFixed(2)},${(cy + R * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
};
