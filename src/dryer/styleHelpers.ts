import type { CSSProperties } from 'react';

export function segStyle(accent: string, active: boolean): CSSProperties {
  return {
    cursor: 'pointer',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderRadius: 18,
    transition: 'all .15s',
    ...(active
      ? {
          background: accent + '1f',
          border: '1px solid ' + accent,
          color: '#fff',
          boxShadow: '0 8px 30px -12px ' + accent,
        }
      : {
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.09)',
          color: 'rgba(255,255,255,0.6)',
        }),
  };
}

export function toggleTrackStyle(accent: string, on: boolean): CSSProperties {
  return {
    cursor: 'pointer',
    width: 88,
    height: 48,
    borderRadius: 999,
    padding: 5,
    display: 'flex',
    transition: 'all .2s',
    background: on ? accent : 'rgba(255,255,255,0.12)',
    justifyContent: on ? 'flex-end' : 'flex-start',
  };
}

export const toggleKnobStyle: CSSProperties = {
  width: 38,
  height: 38,
  borderRadius: '50%',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
};

export function roundStepperStyle(size: number): CSSProperties {
  return {
    width: size,
    height: size,
    flex: 'none',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.18)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  };
}

export const panelStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 30,
  padding: '34px 40px',
};

export const sectionLabelStyle: CSSProperties = {
  font: "600 24px/1 'Manrope'",
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.45)',
};

export const primaryButtonStyle = (accent: string): CSSProperties => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '0 52px',
  height: 88,
  borderRadius: 999,
  background: accent,
  boxShadow: '0 20px 60px -18px ' + accent,
  font: "700 26px/1 'Manrope'",
});
