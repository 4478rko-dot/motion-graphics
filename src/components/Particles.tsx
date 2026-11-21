import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const COUNT = 46;

/** ذرّات ذهبية تصعد ببطء وتتلألأ */
export const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill>
      {Array.from({ length: COUNT }).map((_, i) => {
        const x0 = random(`x${i}`) * width;
        const y0 = random(`y${i}`) * height;
        const speed = 12 + random(`s${i}`) * 28;
        const size = 2 + random(`r${i}`) * 4.5;
        const sway = 14 + random(`w${i}`) * 26;
        const phase = random(`p${i}`) * Math.PI * 2;
        const y = (((y0 - t * speed) % height) + height) % height;
        const x = x0 + Math.sin(t * 0.6 + phase) * sway;
        const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(t * (0.8 + random(`f${i}`)) + phase));
        const fadeIn = Math.min(1, frame / (1.5 * fps));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: theme.goldLight,
              opacity: twinkle * 0.7 * fadeIn,
              boxShadow: `0 0 ${size * 3}px ${size}px rgba(241,217,138,0.35)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
