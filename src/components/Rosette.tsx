import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { theme } from "../theme";
import { starPoints } from "../geometry";

/** وردة هندسية كبيرة تدور ببطء خلف الآية */
export const Rosette: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;
  const cx = width / 2;
  const cy = height * 0.47;

  const appear = interpolate(frame, [0, 2 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(appear, [0, 1], [0.85, 1]);
  const rot = t * 4;

  return (
    <AbsoluteFill style={{ opacity: appear * 0.32 }}>
      <svg width={width} height={height}>
        <g
          transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
          fill="none"
          stroke={theme.gold}
          strokeLinejoin="round"
        >
          <g transform={`rotate(${rot} ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={500} strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={488} strokeWidth={0.8} />
            <polygon points={starPoints(cx, cy, 480, 380, 16)} strokeWidth={1.4} />
            <polygon points={starPoints(cx, cy, 440, 440 * 0.7654, 8)} strokeWidth={1} />
            <polygon points={starPoints(cx, cy, 440, 440 * 0.7654, 8, 22.5)} strokeWidth={1} />
          </g>
          <g transform={`rotate(${-rot * 1.5} ${cx} ${cy})`}>
            <polygon points={starPoints(cx, cy, 340, 260, 12)} strokeWidth={1.2} />
            <circle cx={cx} cy={cy} r={250} strokeWidth={0.8} />
            {Array.from({ length: 24 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 24;
              return (
                <circle
                  key={i}
                  cx={cx + 400 * Math.cos(a)}
                  cy={cy + 400 * Math.sin(a)}
                  r={5}
                  fill={theme.gold}
                  stroke="none"
                />
              );
            })}
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
