import { CIRC } from '../constants';
import { fmtTime } from '../helpers';

interface RunningScreenProps {
  accent: string;
  curName: string;
  curTemp: string;
  curDryness: string;
  total: number;
  remaining: number;
  paused: boolean;
  estFinish: string;
  onPause: () => void;
  onCancel: () => void;
  onOpenFF: () => void;
}

export function RunningScreen({ accent, curName, curTemp, curDryness, total, remaining, paused, estFinish, onPause, onCancel, onOpenFF }: RunningScreenProps) {
  const runFill = total ? (total - remaining) / total : 0;
  const runDash = runFill * CIRC + ' ' + CIRC;
  const runPct = total ? Math.min(100, Math.round(((total - remaining) / total) * 100)) : 0;

  let runPhase = 'Heating';
  if (runFill >= 0.98) runPhase = 'Anti-crease';
  else if (runFill >= 0.9) runPhase = 'Cooling';
  else if (runFill >= 0.12) runPhase = 'Drying';
  if (remaining === 0 && total) runPhase = 'Complete';

  return (
    <div style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 120, padding: '0 120px' }}>
      <div style={{ position: 'relative', width: 640, height: 640 }}>
        <svg viewBox="0 0 600 600" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="runglow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>
          <circle cx={300} cy={300} r={270} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={14} />
          <circle cx={300} cy={300} r={270} fill="none" stroke={accent} strokeWidth={16} strokeLinecap="round" strokeDasharray={runDash} transform="rotate(-90 300 300)" filter="url(#runglow)" opacity={0.5} />
          <circle cx={300} cy={300} r={270} fill="none" stroke={accent} strokeWidth={16} strokeLinecap="round" strokeDasharray={runDash} transform="rotate(-90 300 300)" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ font: "600 20px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: accent }}>{runPhase}</div>
          <div style={{ marginTop: 16, font: "400 148px/1 'Space Grotesk'", letterSpacing: '-0.02em' }}>{fmtTime(remaining)}</div>
          <div style={{ font: "500 24px/1 'Manrope'", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>hours remaining</div>
        </div>
      </div>

      <div style={{ width: 640, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div>
          <div style={{ font: "600 20px/1 'Manrope'", letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Now running</div>
          <div style={{ marginTop: 14, font: "500 78px/1 'Space Grotesk'" }}>{curName}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { label: 'Finishes at', value: estFinish },
            { label: 'Progress', value: runPct + '%' },
            { label: 'Temperature', value: curTemp },
            { label: 'Dryness', value: curDryness },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '28px 32px' }}>
              <div style={{ font: "500 18px/1 'Manrope'", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
              <div style={{ marginTop: 12, font: "500 42px/1 'Space Grotesk'" }}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, marginTop: 6 }}>
          <div onClick={onPause} style={{ flex: 1, height: 88, borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 26px/1 'Manrope'", cursor: 'pointer' }}>
            {paused ? 'Resume' : 'Pause'}
          </div>
          <div onClick={onCancel} style={{ flex: 1, height: 88, borderRadius: 999, border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: "600 26px/1 'Manrope'", cursor: 'pointer' }}>
            Cancel
          </div>
        </div>
        <div
          onClick={onOpenFF}
          style={{
            marginTop: 4,
            cursor: 'pointer',
            borderRadius: 24,
            padding: '26px 32px',
            background: `linear-gradient(155deg, color-mix(in oklab, ${accent} 20%, #0d0e11), #0b0c0f)`,
            border: `1px solid color-mix(in oklab, ${accent} 40%, transparent)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ font: "600 15px/1 'Manrope'", letterSpacing: '0.26em', textTransform: 'uppercase', color: accent }}>While it tumbles</div>
            <div style={{ marginTop: 10, font: "600 34px/1 'Space Grotesk'" }}>Engage Fluff&nbsp;&amp;&nbsp;File™</div>
          </div>
          <span style={{ fontSize: 30 }}>→</span>
        </div>
      </div>
    </div>
  );
}
