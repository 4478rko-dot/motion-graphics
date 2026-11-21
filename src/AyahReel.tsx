import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AyahProps } from "./content";
import { theme } from "./theme";
import { FONT_UI } from "./fonts";
import { Background } from "./components/Background";
import { Rosette } from "./components/Rosette";
import { Frame } from "./components/Frame";
import { Particles } from "./components/Particles";
import { Verse } from "./components/Verse";
import { Divider } from "./components/Ornament";

const ease = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) } as const;

export const AyahReel: React.FC<AyahProps> = ({ intro, verse, reference, highlightWords }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);

  // التوقيتات (تتكيّف مع مدة الفيديو)
  const wordsStart = s(1.6);
  const wordsEnd = durationInFrames - s(4.6);
  const refStart = durationInFrames - s(3.8);
  const fadeOutStart = durationInFrames - s(0.8);

  const introP = interpolate(frame, [s(0.5), s(1.5)], [0, 1], ease);
  const dividerP = interpolate(frame, [s(0.8), s(2)], [0, 1], ease);
  const refP = interpolate(frame, [refStart, refStart + s(1)], [0, 1], ease);
  const refDividerP = interpolate(frame, [refStart - s(0.3), refStart + s(1)], [0, 1], ease);
  const globalOut = interpolate(frame, [fadeOutStart, durationInFrames - 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // تكبير بطيء جدًا للمشهد كله (إحساس سينمائي)
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.035]);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.oliveDeep, opacity: globalOut }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Background />
        <Rosette />
        <Particles />
      </AbsoluteFill>
      <Frame />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          direction: "rtl",
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            fontFamily: FONT_UI,
            fontWeight: 700,
            fontSize: 54,
            color: theme.gold,
            letterSpacing: 1,
            opacity: introP,
            transform: `translateY(${(1 - introP) * -24}px)`,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          {intro}
        </div>
        <div style={{ marginTop: 18, marginBottom: 40 }}>
          <Divider progress={dividerP} />
        </div>

        <Verse verse={verse} highlightWords={highlightWords} startFrame={wordsStart} endFrame={wordsEnd} />

        <div style={{ marginTop: 50 }}>
          <Divider progress={refDividerP} width={340} />
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: FONT_UI,
            fontSize: 46,
            color: theme.goldLight,
            opacity: refP,
            transform: `translateY(${(1 - refP) * 20}px)`,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          ﴿ {reference} ﴾
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
