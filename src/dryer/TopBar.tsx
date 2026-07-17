interface TopBarProps {
  accent: string;
  clockLabel: string;
}

export function TopBar({ accent, clockLabel }: TopBarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 68px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        zIndex: 5,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ font: "700 34px/1 'Space Grotesk'", letterSpacing: '0.02em' }}>BORSCH</span>
        <span style={{ font: "500 16px/1 'Manrope'", letterSpacing: '0.34em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
          Serie&nbsp;10 · HeatCare
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, font: "500 22px/1 'Manrope'", color: 'rgba(255,255,255,0.55)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: accent, boxShadow: '0 0 12px ' + accent }} />
          HomeLink
        </span>
        <span>Drum&nbsp;8&nbsp;kg</span>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{clockLabel}</span>
      </div>
    </div>
  );
}
