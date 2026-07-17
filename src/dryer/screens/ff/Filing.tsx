interface FilingProps {
  accent: string;
  filePct: number;
}

export function Filing({ accent, filePct }: FilingProps) {
  const filingNote = filePct < 40 ? 'Verifying identity…' : filePct < 75 ? 'Signing Form 1040…' : 'Awaiting acknowledgement…';

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 120px' }}>
      <div style={{ width: 150, height: 150, borderRadius: '50%', border: '5px solid rgba(255,255,255,0.1)', borderTopColor: accent, animation: 'ffspin 0.9s linear infinite' }} />
      <div style={{ marginTop: 52, font: "400 52px/1.15 'Space Grotesk'", textAlign: 'center' }}>Transmitting to the Revenue Service…</div>
      <div style={{ marginTop: 20, font: "300 26px/1 'Manrope'", color: 'rgba(255,255,255,0.5)' }}>{filingNote}</div>
      <div style={{ marginTop: 40, width: 640, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 999, background: accent, width: filePct + '%', boxShadow: '0 0 18px ' + accent }} />
      </div>
      <div style={{ marginTop: 16, font: "500 24px/1 'Space Grotesk'", color: accent }}>{filePct}%</div>
    </div>
  );
}
