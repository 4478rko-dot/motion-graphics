import '@fontsource/amiri/arabic-400.css';
import '@fontsource/amiri/arabic-700.css';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

const GOLD = '#d8b46a';

// نجمة ثمانية زخرفية: مربعان متداخلان
const Star: React.FC<{size: number; opacity: number; rotate: number; stroke?: number}> = ({size, opacity, rotate, stroke = 2}) => (
  <svg width={size} height={size} viewBox="-50 -50 100 100" style={{position: 'absolute', opacity, transform: `rotate(${rotate}deg)`}}>
    <g fill="none" stroke={GOLD} strokeWidth={stroke} vectorEffect="non-scaling-stroke">
      <rect x={-35} y={-35} width={70} height={70} vectorEffect="non-scaling-stroke" />
      <rect x={-35} y={-35} width={70} height={70} transform="rotate(45)" vectorEffect="non-scaling-stroke" />
      <circle r={22} vectorEffect="non-scaling-stroke" />
      <circle r={48} strokeWidth={stroke * 0.5} vectorEffect="non-scaling-stroke" />
    </g>
  </svg>
);

// ذرات ضوء ثابتة البذرة
const dots = Array.from({length: 40}, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 9301 + n * 49297) * 233280) % 1 + 1) % 1;
  return {x: r(1) * 1080, y: r(2) * 1920, s: 2 + r(3) * 4, speed: 0.3 + r(4) * 0.8, phase: r(5) * Math.PI * 2};
});

export const Ayah: React.FC<{words: string[]; reference: string}> = ({words, reference}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const fadeOut = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bgIn = interpolate(frame, [0, 30], [0, 1], {extrapolateRight: 'clamp'});
  const starIn = spring({frame: frame - 5, fps, config: {damping: 200}, durationInFrames: 60});

  const wordStart = 35;
  const wordGap = 14;
  const lastWordEnd = wordStart + wordGap * words.length + 20;
  const lineIn = interpolate(frame, [lastWordEnd, lastWordEnd + 25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const refIn = interpolate(frame, [lastWordEnd + 15, lastWordEnd + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, #123c3a 0%, #0a1f24 55%, #050d10 100%)', opacity: fadeOut}}>
      {/* ذرات ضوء */}
      <AbsoluteFill style={{opacity: bgIn}}>
        {dots.map((d, i) => {
          const y = (d.y - frame * d.speed + 1920) % 1920;
          const tw = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(frame / 20 + d.phase));
          return <div key={i} style={{position: 'absolute', left: d.x, top: y, width: d.s, height: d.s, borderRadius: '50%', background: GOLD, opacity: tw, boxShadow: `0 0 ${d.s * 3}px ${GOLD}`}} />;
        })}
      </AbsoluteFill>

      {/* النجمة الكبيرة خلف النص */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', transform: `scale(${0.85 + starIn * 0.15})`}}>
        <Star size={980} opacity={0.13 * starIn} rotate={frame * 0.08} />
        <Star size={700} opacity={0.12 * starIn} rotate={-frame * 0.12} stroke={1.2} />
      </AbsoluteFill>

      {/* زخارف علوية وسفلية */}
      <AbsoluteFill style={{alignItems: 'center'}}>
        <div style={{position: 'absolute', top: 260, opacity: starIn}}><div style={{position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Star size={90} opacity={0.8} rotate={frame * 0.3} stroke={1.5} /></div></div>
        <div style={{position: 'absolute', bottom: 260, opacity: starIn}}><div style={{position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Star size={90} opacity={0.8} rotate={-frame * 0.3} stroke={1.5} /></div></div>
      </AbsoluteFill>

      {/* نص الآية */}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 90px'}}>
        <div dir="rtl" style={{fontFamily: 'Amiri', fontWeight: 700, fontSize: 118, lineHeight: 1.9, color: '#f6ecd6', textAlign: 'center', textShadow: '0 4px 30px rgba(0,0,0,0.6), 0 0 40px rgba(216,180,106,0.25)'}}>
          {words.map((w, i) => {
            const p = spring({frame: frame - (wordStart + i * wordGap), fps, config: {damping: 200}, durationInFrames: 30});
            return (
              <span key={i} style={{display: 'inline-block', margin: '0 14px', opacity: p, filter: `blur(${(1 - p) * 12}px)`, transform: `translateY(${(1 - p) * 40}px)`}}>
                {w}
              </span>
            );
          })}
        </div>

        <div style={{marginTop: 30, height: 2, width: 420 * lineIn, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`}} />

        <div dir="rtl" style={{marginTop: 34, fontFamily: 'Amiri', fontSize: 54, color: GOLD, opacity: refIn, transform: `translateY(${(1 - refIn) * 15}px)`}}>
          {reference}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
