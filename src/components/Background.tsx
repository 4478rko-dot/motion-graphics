import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { KHATAM_INNER, starPoints } from "../geometry";

const TILE = 180;

/** بلاطة زخرفة هندسية: نجمة ثمانية في المركز وأرباعها في الزوايا مع خطوط وصل */
const Tile: React.FC = () => {
  const c = TILE / 2;
  const R = TILE * 0.36;
  const corners = [
    [0, 0],
    [TILE, 0],
    [0, TILE],
    [TILE, TILE],
  ];
  return (
    <g fill="none" stroke={theme.gold} strokeLinejoin="round">
      <polygon points={starPoints(c, c, R, R * KHATAM_INNER, 8)} strokeWidth={1.6} />
      <polygon points={starPoints(c, c, R * 0.55, R * 0.55 * KHATAM_INNER, 8, 22.5)} strokeWidth={1} />
      {corners.map(([x, y], i) => (
        <g key={i}>
          <polygon points={starPoints(x, y, R, R * KHATAM_INNER, 8)} strokeWidth={1.6} />
          <circle cx={x} cy={y} r={R * 0.28} strokeWidth={1} />
        </g>
      ))}
      {/* خطوط الوصل بين النجوم */}
      <line x1={c} y1={c - R} x2={c} y2={0} strokeWidth={1} />
      <line x1={c} y1={c + R} x2={c} y2={TILE} strokeWidth={1} />
      <line x1={c - R} y1={c} x2={0} y2={c} strokeWidth={1} />
      <line x1={c + R} y1={c} x2={TILE} y2={c} strokeWidth={1} />
    </g>
  );
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;

  // حركة هادئة: انزلاق قطري بطيء + تنفّس في الشفافية
  const dx = t * 6;
  const dy = t * 10;
  const breathe = 0.16 + 0.04 * Math.sin(t * 0.9);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 45%, ${theme.olive} 0%, ${theme.oliveDark} 55%, ${theme.oliveDeep} 100%)`,
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern
            id="islamic"
            width={TILE}
            height={TILE}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${dx} ${dy}) rotate(${Math.sin(t * 0.25) * 1.5} ${width / 2} ${height / 2})`}
          >
            <Tile />
          </pattern>
          <radialGradient id="patternFade" cx="50%" cy="47%" r="65%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="35%" stopColor="#555" />
            <stop offset="100%" stopColor="#fff" />
          </radialGradient>
          <mask id="patternMask">
            <rect width={width} height={height} fill="url(#patternFade)" />
          </mask>
        </defs>
        <rect width={width} height={height} fill="url(#islamic)" mask="url(#patternMask)" opacity={breathe * 2.2} />
      </svg>
      {/* إضاءة ذهبية دافئة تنبض ببطء خلف النص */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 46%, rgba(212,175,55,${0.13 + 0.04 * Math.sin(t * 1.2)}) 0%, rgba(212,175,55,0) 45%)`,
        }}
      />
      {/* تظليل الأطراف */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 75% 65% at 50% 48%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
