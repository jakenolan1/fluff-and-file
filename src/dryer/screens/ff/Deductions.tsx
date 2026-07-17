import { money } from '../../helpers';
import { primaryButtonStyle } from '../../styleHelpers';
import type { Deductions, TaxInfo } from '../../types';

const DED_META: { key: keyof Deductions; label: string; desc: string; amt: number }[] = [
  { key: 'home', label: 'Home office', desc: 'The laundry room counts, technically.', amt: 3500 },
  { key: 'dependents', label: 'Dependents', desc: 'Two, plus a very demanding cat.', amt: 4200 },
  { key: 'charity', label: 'Charitable giving', desc: 'Donated garments to the local shelter.', amt: 1800 },
  { key: 'softener', label: 'Fabric-care essentials', desc: 'A Borsch-approved deduction.', amt: 900 },
];

const DED_TYPES = [
  { label: 'Standard', sub: '$14,600 · zero paperwork' },
  { label: 'Itemized', sub: 'Best if deductions exceed standard' },
];

interface DeductionsProps {
  accent: string;
  tax: TaxInfo;
  credits: number;
  onToggle: (k: keyof Deductions) => void;
  onItemized: (i: number) => void;
  onNext: () => void;
}

export function DeductionsStep({ accent, tax, credits, onToggle, onItemized, onNext }: DeductionsProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '64px 120px', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Step 03 · Deductions</div>
      <div style={{ marginTop: 16, font: "400 56px/1.05 'Space Grotesk'" }}>Let’s keep more of it.</div>

      <div style={{ marginTop: 38, display: 'flex', gap: 16, maxWidth: 900 }}>
        {DED_TYPES.map((o, i) => {
          const active = i === tax.itemized;
          return (
            <div
              key={o.label}
              onClick={() => onItemized(i)}
              style={{
                cursor: 'pointer',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '26px 30px',
                borderRadius: 20,
                transition: 'all .15s',
                ...(active
                  ? { background: accent + '1f', border: '1px solid ' + accent }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.65)' }),
              }}
            >
              <span style={{ font: "600 26px/1 'Manrope'" }}>{o.label}</span>
              <span style={{ font: "400 19px/1.3 'Manrope'", opacity: 0.6, marginTop: 8 }}>{o.sub}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, maxWidth: 1300 }}>
        {DED_META.map((d) => {
          const on = tax.ded[d.key];
          return (
            <div
              key={d.key}
              onClick={() => onToggle(d.key)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '26px 30px',
                borderRadius: 20,
                transition: 'all .15s',
                ...(on ? { background: accent + '1a', border: '1px solid ' + accent } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)' }),
              }}
            >
              <div>
                <div style={{ font: "600 27px/1 'Manrope'" }}>{d.label}</div>
                <div style={{ marginTop: 10, font: "400 20px/1.35 'Manrope'", opacity: 0.55 }}>{d.desc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <span style={{ font: "500 28px/1 'Space Grotesk'", color: accent }}>+{money(d.amt)}</span>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    transition: 'all .15s',
                    ...(on ? { background: accent, color: '#fff' } : { border: '1px solid rgba(255,255,255,0.2)', color: 'transparent' }),
                  }}
                >
                  ✓
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ font: "400 24px/1 'Manrope'", color: 'rgba(255,255,255,0.5)' }}>
          Credits applied · <span style={{ color: accent, fontFamily: 'Space Grotesk' }}>{money(credits)}</span>
        </div>
        <div onClick={onNext} style={primaryButtonStyle(accent)}>
          Review return <span>→</span>
        </div>
      </div>
    </div>
  );
}
