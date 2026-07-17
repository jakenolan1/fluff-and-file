import { Fragment } from 'react';

interface IntroProps {
  accent: string;
  onNext: () => void;
}

export function Intro({ accent, onNext }: IntroProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: accent }}>At your service</div>
      <div style={{ marginTop: 22, font: "400 76px/1.08 'Space Grotesk'", maxWidth: 1200 }}>
        Two of life’s chores.
        <br />
        One elegant cycle.
      </div>
      <div style={{ marginTop: 28, font: "300 30px/1.5 'Manrope'", color: 'rgba(255,255,255,0.6)', maxWidth: 1100 }}>
        Load your garments, and while the drum does its work, we’ll prepare and file your federal return. You’ll answer a
        few questions; we’ll handle the arithmetic, the forms, and the transmission.
      </div>
      <div style={{ marginTop: 44, display: 'flex', gap: 44 }}>
        {[
          { value: '~9 min', label: 'Average filing' },
          { value: 'Bank-grade', label: 'Encrypted transmission' },
          { value: 'e-File', label: 'Direct to Revenue' },
        ].map((stat, i) => (
          <Fragment key={stat.label}>
            {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />}
            <div>
              <div style={{ font: "500 48px/1 'Space Grotesk'", color: accent }}>{stat.value}</div>
              <div style={{ marginTop: 10, font: "400 22px/1 'Manrope'", color: 'rgba(255,255,255,0.45)' }}>{stat.label}</div>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        onClick={onNext}
        style={{
          marginTop: 60,
          cursor: 'pointer',
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '0 52px',
          height: 92,
          borderRadius: 999,
          background: accent,
          boxShadow: '0 20px 60px -18px ' + accent,
          font: "700 28px/1 'Manrope'",
        }}
      >
        Begin filing <span>→</span>
      </div>
    </div>
  );
}
