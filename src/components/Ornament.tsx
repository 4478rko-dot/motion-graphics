import React from "react";
import { theme } from "../theme";
import { KHATAM_INNER, starPoints } from "../geometry";

/** فاصل زخرفي: خطان يتمددان ونجمة في المنتصف */
export const Divider: React.FC<{ progress: number; width?: number }> = ({ progress, width = 420 }) => {
  const h = 40;
  const c = width / 2;
  const len = (width / 2 - 34) * progress;
  return (
    <svg width={width} height={h} style={{ overflow: "visible" }}>
      <line x1={c - 30} y1={h / 2} x2={c - 30 - len} y2={h / 2} stroke={theme.gold} strokeWidth={2} strokeLinecap="round" />
      <line x1={c + 30} y1={h / 2} x2={c + 30 + len} y2={h / 2} stroke={theme.gold} strokeWidth={2} strokeLinecap="round" />
      <circle cx={c - 30 - len} cy={h / 2} r={4 * progress} fill={theme.gold} />
      <circle cx={c + 30 + len} cy={h / 2} r={4 * progress} fill={theme.gold} />
      <g transform={`rotate(${progress * 180} ${c} ${h / 2})`} opacity={progress}>
        <polygon points={starPoints(c, h / 2, 16, 16 * KHATAM_INNER, 8)} fill="none" stroke={theme.gold} strokeWidth={2} />
        <circle cx={c} cy={h / 2} r={4} fill={theme.goldLight} />
      </g>
    </svg>
  );
};
