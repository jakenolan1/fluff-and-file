interface ConfirmProps {
  accent: string;
  running: boolean;
  statusUpdates: boolean | null;
  onGoHome: () => void;
}

export function Confirm({ accent, running, statusUpdates, onGoHome }: ConfirmProps) {
  const title = statusUpdates ? 'We’ll keep you posted.' : 'All done. Back to the laundry.';
  const msg = statusUpdates
    ? 'Refund milestones and any Revenue Service correspondence will appear right here on your dryer display.'
    : 'Your return is filed and accepted. Enjoy your warm, well-organised life.';
  const cta = running ? 'Back to cycle' : 'Back to controls';

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 120px', textAlign: 'center', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "400 60px/1.15 'Space Grotesk'", maxWidth: 1100 }}>{title}</div>
      <div style={{ marginTop: 24, font: "300 30px/1.5 'Manrope'", color: 'rgba(255,255,255,0.6)', maxWidth: 900 }}>{msg}</div>
      <div
        onClick={onGoHome}
        style={{
          marginTop: 52,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '0 56px',
          height: 92,
          borderRadius: 999,
          background: accent,
          boxShadow: '0 20px 60px -18px ' + accent,
          font: "700 28px/1 'Manrope'",
        }}
      >
        {cta} <span>→</span>
      </div>
    </div>
  );
}
