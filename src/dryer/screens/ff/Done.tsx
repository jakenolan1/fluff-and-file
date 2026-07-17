import { money } from '../../helpers';
import type { TaxResult } from '../../types';

interface DoneProps {
  accent: string;
  result: TaxResult;
  onStatusYes: () => void;
  onStatusNo: () => void;
}

export function Done({ accent, result, onStatusYes, onStatusNo }: DoneProps) {
  const isRefund = result.result >= 0;
  const resultColor = isRefund ? '#39d98a' : '#ff5a5f';
  const doneMsg = isRefund ? `Your ${money(result.result)} refund is on its way.` : `Payment of ${money(result.result)} has been scheduled.`;

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 120px', textAlign: 'center', animation: 'ffrise .5s ease both' }}>
      <div style={{ position: 'relative', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: resultColor, opacity: 0.2, filter: 'blur(30px)' }} />
        <div style={{ width: 150, height: 150, borderRadius: '50%', border: '3px solid ' + resultColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 74, color: resultColor }}>✓</div>
      </div>
      <div style={{ marginTop: 44, font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: accent }}>Filed &amp; accepted</div>
      <div style={{ marginTop: 20, font: "400 66px/1.1 'Space Grotesk'" }}>Consider it handled.</div>
      <div style={{ marginTop: 22, font: "300 30px/1.5 'Manrope'", color: 'rgba(255,255,255,0.6)', maxWidth: 900 }}>
        Your 2025 federal return has been transmitted and accepted. {doneMsg}
      </div>
      <div style={{ marginTop: 52, padding: '38px 56px', borderRadius: 26, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 760 }}>
        <div style={{ font: "500 26px/1.4 'Manrope'" }}>Shall your dryer keep you apprised of your filing status?</div>
        <div style={{ marginTop: 16, font: "300 22px/1.4 'Manrope'", color: 'rgba(255,255,255,0.5)' }}>We’ll surface refund milestones right here on the drum display.</div>
        <div style={{ marginTop: 30, display: 'flex', gap: 18, justifyContent: 'center' }}>
          <div
            onClick={onStatusYes}
            style={{ cursor: 'pointer', padding: '0 46px', height: 82, borderRadius: 999, background: accent, display: 'flex', alignItems: 'center', font: "700 24px/1 'Manrope'", boxShadow: '0 16px 44px -16px ' + accent }}
          >
            Yes, keep me posted
          </div>
          <div
            onClick={onStatusNo}
            style={{ cursor: 'pointer', padding: '0 46px', height: 82, borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', font: "600 24px/1 'Manrope'", color: 'rgba(255,255,255,0.7)' }}
          >
            No, thank you
          </div>
        </div>
      </div>
    </div>
  );
}
