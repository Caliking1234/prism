import { useId } from 'react';

type Variant = 'hero' | 'blue' | 'teal' | 'gold' | 'shift';
type Orb = [left: string, top: string, size: string, color: string, anim: number, seconds: number];

const ORBS: Record<Variant, Orb[]> = {
  hero: [['-12%', '-35%', '60%', 'rgba(0,153,153,.32)', 0, 18], ['8%', '45%', '42%', 'rgba(217,164,65,.20)', 1, 23]],
  blue: [['62%', '-90%', '55%', 'rgba(0,112,192,.20)', 0, 20], ['-12%', '10%', '34%', 'rgba(217,164,65,.14)', 1, 24]],
  teal: [['62%', '-90%', '55%', 'rgba(0,153,153,.22)', 0, 20], ['-12%', '10%', '34%', 'rgba(217,164,65,.14)', 1, 24]],
  gold: [['66%', '-80%', '48%', 'rgba(217,164,65,.20)', 2, 21], ['-10%', '20%', '36%', 'rgba(0,153,153,.12)', 0, 25]],
  shift: [['60%', '-60%', '60%', 'rgba(217,164,65,.22)', 1, 22]]
};

/** Decorative ambient light: drifting brand-coloured orbs and the floating prism outline. Purely visual. */
export default function Ambient({ variant, triangle = false }: { variant: Variant; triangle?: boolean }) {
  const gid = useId().replace(/:/g, '');
  return (
    <div className={`ambient ambient--${variant}`} aria-hidden="true">
      {variant === 'shift' && <div className="ambient__shift" />}
      {ORBS[variant].map(([left, top, size, color, anim, seconds], i) => (
        <span key={i} className="ambient__orb" style={{
          left, top, width: size,
          background: `radial-gradient(circle at center, ${color} 0%, transparent 68%)`,
          animationName: `pc-drift-${anim}`, animationDuration: `${seconds}s`, animationDelay: `${-i * 4}s`
        }} />
      ))}
      {triangle && (
        <svg className="ambient__tri" viewBox="0 0 100 62">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0070C0" /><stop offset=".55" stopColor="#009999" /><stop offset="1" stopColor="#D9A441" />
            </linearGradient>
          </defs>
          <polygon points="50,2 98,58 2,58" fill="none" stroke="rgba(30,42,54,.12)" strokeWidth=".5" />
          <polyline points="8,56 50,10 92,56" fill="none" stroke={`url(#${gid})`} strokeWidth="1.2" strokeOpacity=".55" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
