import type { ChangeEvent } from 'react';
import { primaryButtonStyle } from '../../styleHelpers';
import type { TaxInfo } from '../../types';

const FIELD_LABEL_STYLE = { font: "600 20px/1 'Manrope'", letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 14 };
const INPUT_STYLE = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '22px 26px', color: '#fff', fontSize: 30 };
const MONEY_INPUT_STYLE = { ...INPUT_STYLE, padding: '22px 26px 22px 52px', fontFamily: 'Space Grotesk' };

interface IncomeProps {
  accent: string;
  tax: TaxInfo;
  onField: (field: keyof TaxInfo) => (value: string) => void;
  onNext: () => void;
}

export function Income({ accent, tax, onField, onNext }: IncomeProps) {
  const change = (field: keyof TaxInfo) => (e: ChangeEvent<HTMLInputElement>) => onField(field)(e.target.value);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '64px 120px', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Step 02 · Income</div>
      <div style={{ marginTop: 16, font: "400 56px/1.05 'Space Grotesk'" }}>What came in this year?</div>
      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px', maxWidth: 1300 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={FIELD_LABEL_STYLE}>Employer</div>
          <input value={tax.employer} onChange={change('employer')} style={INPUT_STYLE} />
        </div>
        <div>
          <div style={FIELD_LABEL_STYLE}>W-2 wages (USD)</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 26, top: '50%', transform: 'translateY(-50%)', font: "400 30px/1 'Space Grotesk'", color: 'rgba(255,255,255,0.4)' }}>$</span>
            <input value={tax.wages} onChange={change('wages')} style={MONEY_INPUT_STYLE} />
          </div>
        </div>
        <div>
          <div style={FIELD_LABEL_STYLE}>Other income (USD)</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 26, top: '50%', transform: 'translateY(-50%)', font: "400 30px/1 'Space Grotesk'", color: 'rgba(255,255,255,0.4)' }}>$</span>
            <input value={tax.other} onChange={change('other')} style={MONEY_INPUT_STYLE} />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16, padding: '22px 28px', borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', maxWidth: 1300 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent, boxShadow: '0 0 10px ' + accent }} />
        <span style={{ font: "400 23px/1.4 'Manrope'", color: 'rgba(255,255,255,0.6)' }}>
          A W-2 was detected in your left trouser pocket during the last spin cycle. We’ve pre-filled it for you.
        </span>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <div onClick={onNext} style={primaryButtonStyle(accent)}>
          Continue <span>→</span>
        </div>
      </div>
    </div>
  );
}
