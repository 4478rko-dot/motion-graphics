import React from "react";
import { Composition } from "remotion";
import { AyahReel } from "./AyahReel";
import { defaultAyah, AyahProps } from "./content";
import "./fonts";

export const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AyahReel"
      component={AyahReel as unknown as React.FC<Record<string, unknown>>}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={defaultAyah.durationInSeconds * FPS}
      defaultProps={defaultAyah as unknown as Record<string, unknown>}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(
          ((props as unknown as AyahProps).durationInSeconds ?? 15) * FPS
        ),
      })}
    />
  );
};
