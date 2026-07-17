import { DRYNESS_LEVELS, PROGRAMS, TEMPS } from '../constants';
import { fmtTime } from '../helpers';
import { panelStyle, roundStepperStyle, sectionLabelStyle, segStyle, toggleKnobStyle, toggleTrackStyle } from '../styleHelpers';
import type { RingStyle } from '../types';
import { Dial } from './Dial';

interface MainScreenProps {
  accent: string;
  ringStyle: RingStyle;
  prog: number;
  selectProgram: (i: number) => void;
  dryness: number;
  setDryness: (i: number) => void;
  tempIdx: number;
  setTempIdx: (i: number) => void;
  timedMin: number;
  changeTimed: (d: number) => void;
  delay: number;
  changeDelay: (d: number) => void;
  steam: boolean;
  setSteam: () => void;
  sound: boolean;
  setSound: () => void;
  onStart: () => void;
  onOpenFF: () => void;
}

export function MainScreen({
  accent,
  ringStyle,
  prog,
  selectProgram,
  dryness,
  setDryness,
  tempIdx,
  setTempIdx,
  timedMin,
  changeTimed,
  delay,
  changeDelay,
  steam,
  setSteam,
  sound,
  setSound,
  onStart,
  onOpenFF,
}: MainScreenProps) {
  const p = PROGRAMS[prog];
  const isTimed = !!p.timed;
  const curTime = isTimed ? fmtTime(timedMin) : p.time;
  const curTemp = TEMPS[tempIdx];
  const delayLabel = delay === 0 ? 'Off' : 'in ' + delay + ' h';

  return (
    <div style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', padding: '40px 72px', gap: 48 }}>
      <Dial accent={accent} ringStyle={ringStyle} prog={prog} onSelectProgram={selectProgram} curName={p.name} curTime={curTime} curTemp={curTemp} />

      <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 26 }}>
        <div style={panelStyle}>
          {!isTimed ? (
            <>
              <div style={sectionLabelStyle}>Dryness level</div>
              <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
                {DRYNESS_LEVELS.map((label, i) => (
                  <div key={label} onClick={() => setDryness(i)} style={segStyle(accent, i === dryness)}>
                    <span style={{ font: "600 29px/1.1 'Manrope'", textAlign: 'center' }}>{label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ ...sectionLabelStyle, color: accent }}>Drying time</div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, height: 120 }}>
                <div onClick={() => changeTimed(-5)} style={{ ...roundStepperStyle(96), font: "300 56px/1 'Manrope'" }}>
                  −
                </div>
                <div style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 14 }}>
                  <span style={{ font: "500 80px/1 'Space Grotesk'" }}>{timedMin}</span>
                  <span style={{ font: "500 30px/1 'Manrope'", color: 'rgba(255,255,255,0.5)' }}>min</span>
                </div>
                <div onClick={() => changeTimed(5)} style={{ ...roundStepperStyle(96), font: "300 48px/1 'Manrope'" }}>
                  +
                </div>
              </div>
            </>
          )}
        </div>

        <div style={panelStyle}>
          <div style={sectionLabelStyle}>Temperature</div>
          <div style={{ marginTop: 24, display: 'flex', gap: 16 }}>
            {TEMPS.map((label, i) => (
              <div key={label} onClick={() => setTempIdx(i)} style={segStyle(accent, i === tempIdx)}>
                <span style={{ font: "600 32px/1 'Manrope'" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 26, padding: '30px 34px' }}>
            <div style={{ font: "600 20px/1 'Manrope'", letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)' }}>Delay start</div>
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ font: "500 42px/1 'Space Grotesk'" }}>{delayLabel}</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <div onClick={() => changeDelay(-1)} style={{ ...roundStepperStyle(64), font: "400 40px/1 'Manrope'" }}>
                  −
                </div>
                <div onClick={() => changeDelay(1)} style={{ ...roundStepperStyle(64), font: "400 34px/1 'Manrope'" }}>
                  +
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={setSteam}
            style={{ flex: 'none', width: 290, cursor: 'pointer', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 26, padding: '30px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div style={{ font: "600 28px/1 'Manrope'" }}>Added steam</div>
            <div style={toggleTrackStyle(accent, steam)}>
              <div style={toggleKnobStyle} />
            </div>
          </div>
          <div
            onClick={setSound}
            style={{ flex: 'none', width: 290, cursor: 'pointer', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 26, padding: '30px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div style={{ font: "600 28px/1 'Manrope'" }}>Signal &amp; sound</div>
            <div style={toggleTrackStyle(accent, sound)}>
              <div style={toggleKnobStyle} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
          <div
            onClick={onStart}
            style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, height: 134, borderRadius: 28, background: accent, boxShadow: '0 24px 70px -20px ' + accent, font: "700 40px/1 'Manrope'" }}
          >
            Start <span style={{ fontSize: 32 }}>→</span>
          </div>
          <div
            onClick={onOpenFF}
            style={{
              flex: 1,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 28,
              height: 134,
              padding: '0 42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: `linear-gradient(150deg, color-mix(in oklab, ${accent} 24%, #0d0e11), #0b0c0f)`,
              border: `1px solid color-mix(in oklab, ${accent} 48%, transparent)`,
              boxShadow: '0 24px 70px -30px ' + accent,
            }}
          >
            <div style={{ position: 'absolute', top: -50, right: -30, width: 220, height: 220, borderRadius: '50%', background: accent, opacity: 0.18, filter: 'blur(36px)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ font: "600 16px/1 'Manrope'", letterSpacing: '0.26em', textTransform: 'uppercase', color: accent }}>Concierge Mode</div>
              <div style={{ marginTop: 12, font: "600 42px/1 'Space Grotesk'" }}>Fluff&nbsp;&amp;&nbsp;File™</div>
            </div>
            <span style={{ position: 'relative', fontSize: 36 }}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
