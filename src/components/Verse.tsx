import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { theme } from "../theme";
import { FONT_VERSE } from "../fonts";

type Props = {
  verse: string;
  highlightWords: string[];
  /** إطار ظهور أول كلمة */
  startFrame: number;
  /** إطار ظهور آخر كلمة */
  endFrame: number;
};

/** حجم الخط يتكيّف مع طول الآية (تُحسب الحروف دون التشكيل) */
const autoFontSize = (text: string) => {
  const letters = text.replace(/[ً-ٰٟۖ-ۭ\s]/g, "").length;
  return Math.round(Math.min(112, Math.max(56, Math.sqrt(780000 / (0.9 * Math.max(letters, 1))))));
};

export const Verse: React.FC<Props> = ({ verse, highlightWords, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = verse.trim().split(/\s+/);
  const step = words.length > 1 ? (endFrame - startFrame) / (words.length - 1) : 0;
  const fontSize = autoFontSize(verse);

  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "baseline",
        columnGap: fontSize * 0.32,
        rowGap: fontSize * 0.25,
        width: 860,
        fontFamily: FONT_VERSE,
        fontSize,
        lineHeight: 1.9,
        textAlign: "center",
      }}
    >
      {words.map((word, i) => {
        const at = startFrame + i * step;
        const local = frame - at;
        const p = spring({ frame: local, fps, config: { damping: 18, stiffness: 90, mass: 0.8 } });
        const opacity = interpolate(local, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const blur = interpolate(local, [0, 14], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const y = interpolate(p, [0, 1], [fontSize * 0.45, 0]);
        const scale = interpolate(p, [0, 1], [0.86, 1]);
        // توهج لحظي عند ظهور الكلمة ثم يهدأ
        const glow = interpolate(local, [0, 8, 40], [0, 1, 0.25], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad),
        });
        const isHighlight = highlightWords.includes(word);
        const color = isHighlight ? theme.goldLight : theme.cream;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color,
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${y}px) scale(${scale})`,
              textShadow: `0 0 ${18 + glow * 30}px rgba(212,175,55,${0.25 + glow * 0.55}), 0 4px 14px rgba(0,0,0,0.55)`,
              willChange: "transform, opacity, filter",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
