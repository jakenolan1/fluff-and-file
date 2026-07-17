import { money, parseNum } from '../../helpers';
import type { TaxInfo, TaxResult } from '../../types';

const STATUS_LABELS = ['Single', 'Married filing jointly', 'Head of household'];

interface ReviewProps {
  accent: string;
  tax: TaxInfo;
  result: TaxResult;
  onNext: () => void;
}

export function Review({ accent, tax, result, onNext }: ReviewProps) {
  const isRefund = result.result >= 0;
  const resultColor = isRefund ? '#39d98a' : '#ff5a5f';
  const firstName = tax.name.split(' ')[0] || 'there';

  const reviewLines = [
    { label: 'Filing status', val: STATUS_LABELS[tax.status], color: undefined, font: "500 26px/1 'Manrope'" },
    { label: 'Total income', val: money(parseNum(tax.wages) + parseNum(tax.other)), color: undefined, font: "500 26px/1 'Space Grotesk'" },
    { label: 'Federal tax withheld', val: '+' + money(result.withheld), color: '#39d98a', font: "500 26px/1 'Space Grotesk'" },
    { label: 'Estimated tax due', val: '−' + money(result.taxDue), color: '#ff5a5f', font: "500 26px/1 'Space Grotesk'" },
    { label: 'Deductions & credits', val: '+' + money(result.credits), color: '#39d98a', font: "500 26px/1 'Space Grotesk'" },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '56px 120px', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Step 04 · Review</div>
      <div style={{ display: 'flex', gap: 64, marginTop: 24, alignItems: 'center', flex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ font: "400 40px/1.1 'Space Grotesk'" }}>
            Everything’s in order,
            <br />
            {firstName}.
          </div>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {reviewLines.map((r) => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ font: "400 25px/1 'Manrope'", color: 'rgba(255,255,255,0.6)' }}>{r.label}</span>
                <span style={{ font: r.font, color: r.color }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ width: 620, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ font: "600 20px/1 'Manrope'", letterSpacing: '0.24em', textTransform: 'uppercase', color: resultColor }}>
            {isRefund ? 'Your estimated refund' : 'Balance due'}
          </div>
          <div style={{ marginTop: 22, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: resultColor, opacity: 0.16, filter: 'blur(50px)' }} />
            <div style={{ position: 'relative', font: "500 148px/1 'Space Grotesk'", letterSpacing: '-0.02em', color: resultColor }}>{money(result.result)}</div>
          </div>
          <div style={{ marginTop: 20, font: "300 28px/1.45 'Manrope'", color: 'rgba(255,255,255,0.65)', maxWidth: 520 }}>
            {isRefund ? 'A tidy return — deposited to your account within 21 days.' : 'Owed to the Revenue Service. We can schedule payment from your linked account.'}
          </div>
          <div
            onClick={onNext}
            style={{
              marginTop: 44,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '0 60px',
              height: 96,
              borderRadius: 999,
              background: accent,
              boxShadow: '0 20px 60px -18px ' + accent,
              font: "700 28px/1 'Manrope'",
            }}
          >
            File my return <span>→</span>
          </div>
          <div style={{ marginTop: 18, font: "400 19px/1 'Manrope'", color: 'rgba(255,255,255,0.35)' }}>Signed &amp; encrypted · Form 1040 · TY 2025</div>
        </div>
      </div>
    </div>
  );
}
