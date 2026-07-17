import { fmtTime } from './helpers';

interface RunningPillProps {
  accent: string;
  programName: string;
  remaining: number;
}

export function RunningPill({ accent, programName, remaining }: RunningPillProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 118,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 6,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 24px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        font: "600 20px/1 'Manrope'",
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: '0 0 12px ' + accent, animation: 'ffpulse 1.6s ease-in-out infinite' }} />
      <span style={{ color: 'rgba(255,255,255,0.55)' }}>{programName} drying</span>
      <span style={{ fontFamily: 'Space Grotesk' }}>{fmtTime(remaining)}</span>
    </div>
  );
}
