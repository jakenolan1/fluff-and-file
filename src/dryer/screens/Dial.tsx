import type { CSSProperties } from 'react';
import { DIAL_A0, DIAL_A1, DIAL_CX, DIAL_CY, DIAL_RB, DIAL_RL, DIAL_RN1, DIAL_RN2, PROGRAMS } from '../constants';
import type { RingStyle } from '../types';

interface DialProps {
  accent: string;
  ringStyle: RingStyle;
  prog: number;
  onSelectProgram: (i: number) => void;
  curName: string;
  curTime: string;
  curTemp: string;
}

export function Dial({ accent, ringStyle, prog, onSelectProgram, curName, curTime, curTemp }: DialProps) {
  const aStep = (DIAL_A1 - DIAL_A0) / (PROGRAMS.length - 1);
  const trackSegmented = ringStyle === 'segments';

  const theta = ((DIAL_A0 + prog * aStep) * Math.PI) / 180;
  const needle = {
    x1: (DIAL_CX + DIAL_RN1 * Math.cos(theta)).toFixed(1),
    y1: (DIAL_CY + DIAL_RN1 * Math.sin(theta)).toFixed(1),
    x2: (DIAL_CX + DIAL_RN2 * Math.cos(theta)).toFixed(1),
    y2: (DIAL_CY + DIAL_RN2 * Math.sin(theta)).toFixed(1),
    bx: (DIAL_CX + DIAL_RB * Math.cos(theta)).toFixed(1),
    by: (DIAL_CY + DIAL_RB * Math.sin(theta)).toFixed(1),
  };

  return (
    <div style={{ position: 'relative', width: 1120, height: 920, flex: 'none' }}>
      <svg viewBox="0 0 1120 920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="dialglow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <circle cx={740} cy={460} r={360} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
        <circle cx={740} cy={460} r={330} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={2} />
        {trackSegmented && (
          <circle cx={740} cy={460} r={330} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={16} strokeDasharray="2 13" />
        )}
        <line x1={needle.x1} y1={needle.y1} x2={needle.x2} y2={needle.y2} stroke={accent} strokeWidth={12} strokeLinecap="round" filter="url(#dialglow)" opacity={0.55} />
        <line x1={needle.x1} y1={needle.y1} x2={needle.x2} y2={needle.y2} stroke={accent} strokeWidth={9} strokeLinecap="round" />
        <circle cx={needle.bx} cy={needle.by} r={18} fill={accent} filter="url(#dialglow)" />
        <circle cx={needle.bx} cy={needle.by} r={12} fill={accent} />
        <circle cx={740} cy={460} r={15} fill={accent} />
      </svg>

      {PROGRAMS.map((p, i) => {
        const th = ((DIAL_A0 + i * aStep) * Math.PI) / 180;
        const lx = DIAL_CX + DIAL_RL * Math.cos(th);
        const ly = DIAL_CY + DIAL_RL * Math.sin(th);
        const active = i === prog;
        const itemStyle: CSSProperties = {
          position: 'absolute',
          left: lx.toFixed(1) + 'px',
          top: ly.toFixed(1) + 'px',
          transform: 'translate(-100%,-50%)',
          textAlign: 'right',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          paddingRight: 36,
        };
        return (
          <div key={p.name} onClick={() => onSelectProgram(i)} style={itemStyle}>
            <div
              style={{
                font: (active ? '600 48px' : '500 38px') + '/1 "Manrope"',
                color: active ? '#fff' : 'rgba(255,255,255,0.42)',
                transition: 'all .18s',
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                marginTop: 9,
                font: '400 26px/1 "Space Grotesk"',
                color: active ? accent : 'rgba(255,255,255,0.28)',
                transition: 'all .18s',
              }}
            >
              {p.time}
            </div>
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: 740, top: 460, transform: 'translate(-50%,-50%)', width: 540, textAlign: 'center', pointerEvents: 'none' }}>
        <div style={{ font: "600 24px/1 'Manrope'", letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Programme</div>
        <div style={{ marginTop: 20, font: "500 92px/0.95 'Space Grotesk'" }}>{curName}</div>
        <div style={{ marginTop: 30, display: 'inline-flex', alignItems: 'center', gap: 22, font: "500 32px/1 'Manrope'", color: 'rgba(255,255,255,0.8)' }}>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: 46, color: accent }}>{curTime}</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
          <span>{curTemp}</span>
        </div>
      </div>
    </div>
  );
}
