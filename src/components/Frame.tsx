import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { theme } from "../theme";
import { KHATAM_INNER, starPoints } from "../geometry";

/** إطار ذهبي مزدوج بزوايا مزخرفة يُرسم تدريجيًا */
export const Frame: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const draw = interpolate(frame, [0.2 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const m1 = 54;
  const m2 = 72;
  const per1 = 2 * (width - 2 * m1 + height - 2 * m1);
  const per2 = 2 * (width - 2 * m2 + height - 2 * m2);
  const corners: [number, number][] = [
    [m1, m1],
    [width - m1, m1],
    [m1, height - m1],
    [width - m1, height - m1],
  ];

  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.goldLight} />
            <stop offset="50%" stopColor={theme.gold} />
            <stop offset="100%" stopColor={theme.goldDeep} />
          </linearGradient>
        </defs>
        <rect
          x={m1}
          y={m1}
          width={width - 2 * m1}
          height={height - 2 * m1}
          fill="none"
          stroke="url(#goldGrad)"
          strokeWidth={3}
          strokeDasharray={per1}
          strokeDashoffset={per1 * (1 - draw)}
        />
        <rect
          x={m2}
          y={m2}
          width={width - 2 * m2}
          height={height - 2 * m2}
          fill="none"
          stroke={theme.gold}
          strokeOpacity={0.55}
          strokeWidth={1.2}
          strokeDasharray={per2}
          strokeDashoffset={-per2 * (1 - draw)}
        />
        {corners.map(([x, y], i) => (
          <g key={i} opacity={draw} transform={`rotate(${(1 - draw) * 90} ${x} ${y})`}>
            <polygon
              points={starPoints(x, y, 30, 30 * KHATAM_INNER, 8)}
              fill={theme.oliveDeep}
              stroke="url(#goldGrad)"
              strokeWidth={2.5}
            />
            <circle cx={x} cy={y} r={7} fill={theme.gold} />
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};
