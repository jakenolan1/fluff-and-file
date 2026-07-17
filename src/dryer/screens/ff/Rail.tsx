import { FF_ORDER } from '../../constants';
import type { Screen } from '../../types';

const RAIL_META = [
  { key: 'ff-personal' as Screen, num: '01', label: 'Personal' },
  { key: 'ff-income' as Screen, num: '02', label: 'Income' },
  { key: 'ff-deductions' as Screen, num: '03', label: 'Deductions' },
  { key: 'ff-review' as Screen, num: '04', label: 'Review' },
  { key: 'file' as Screen, num: '05', label: 'File' },
];

interface RailProps {
  accent: string;
  screen: Screen;
  backLabel: string;
  onBack: () => void;
}

export function Rail({ accent, screen, backLabel, onBack }: RailProps) {
  const stageIdx =
    screen === 'ff-filing' || screen === 'ff-done' || screen === 'ff-confirm' ? 4 : Math.max(0, FF_ORDER.indexOf(screen) - 1);

  return (
    <div style={{ width: 560, padding: '64px 68px', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ font: "600 52px/1.05 'Space Grotesk'" }}>
        Fluff&nbsp;&amp;
        <br />
        File™
      </div>
      <div style={{ marginTop: 20, font: "300 24px/1.5 'Manrope'", color: 'rgba(255,255,255,0.5)' }}>
        Your dryer’s in-house tax concierge. Sit back — we’ll walk it through together.
      </div>
      <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RAIL_META.map((s, i) => {
          const active = i === stageIdx;
          const done = i < stageIdx;
          return (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: '600 22px/1 "Space Grotesk"',
                  transition: 'all .2s',
                  ...(active
                    ? { background: accent, color: '#fff', boxShadow: '0 8px 24px -8px ' + accent }
                    : done
                      ? { border: '1px solid ' + accent, color: accent }
                      : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)' }),
                }}
              >
                {done ? '✓' : s.num}
              </div>
              <span style={{ font: '600 27px/1 "Manrope"', color: active ? '#fff' : done ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.4)' }}>{s.label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, font: "600 22px/1 'Manrope'", color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>
          <span>←</span>
          {backLabel}
        </div>
      </div>
    </div>
  );
}
