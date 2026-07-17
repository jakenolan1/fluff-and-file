import type { ChangeEvent } from 'react';
import { primaryButtonStyle } from '../../styleHelpers';
import type { TaxInfo } from '../../types';

const FIELD_LABEL_STYLE = { font: "600 20px/1 'Manrope'", letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.45)', marginBottom: 14 };
const INPUT_STYLE = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '22px 26px', color: '#fff', fontSize: 30 };

const STATUS_OPTIONS = ['Single', 'Married', 'Head of Household'];

interface PersonalProps {
  accent: string;
  tax: TaxInfo;
  onField: (field: keyof TaxInfo) => (value: string) => void;
  onStatus: (i: number) => void;
  onNext: () => void;
}

export function Personal({ accent, tax, onField, onStatus, onNext }: PersonalProps) {
  const change = (field: keyof TaxInfo) => (e: ChangeEvent<HTMLInputElement>) => onField(field)(e.target.value);

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', padding: '64px 120px', animation: 'ffrise .4s ease both' }}>
      <div style={{ font: "600 18px/1 'Manrope'", letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Step 01 · Personal</div>
      <div style={{ marginTop: 16, font: "400 56px/1.05 'Space Grotesk'" }}>Let’s confirm who’s filing.</div>
      <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px', maxWidth: 1300 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={FIELD_LABEL_STYLE}>Full legal name</div>
          <input value={tax.name} onChange={change('name')} style={INPUT_STYLE} />
        </div>
        <div>
          <div style={FIELD_LABEL_STYLE}>Social security number</div>
          <input value={tax.ssn} onChange={change('ssn')} style={{ ...INPUT_STYLE, fontFamily: 'Space Grotesk', letterSpacing: '0.14em' }} />
        </div>
        <div>
          <div style={FIELD_LABEL_STYLE}>Mailing address</div>
          <input value={tax.address} onChange={change('address')} style={INPUT_STYLE} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={FIELD_LABEL_STYLE}>Filing status</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {STATUS_OPTIONS.map((label, i) => {
              const active = i === tax.status;
              return (
                <div
                  key={label}
                  onClick={() => onStatus(i)}
                  style={{
                    cursor: 'pointer',
                    height: 96,
                    borderRadius: 18,
                    padding: '0 30px',
                    flex: 'none',
                    minWidth: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .15s',
                    ...(active
                      ? { background: accent + '1f', border: '1px solid ' + accent, color: '#fff', boxShadow: '0 8px 30px -12px ' + accent }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.6)' }),
                  }}
                >
                  <span style={{ font: "600 26px/1 'Manrope'" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <div onClick={onNext} style={primaryButtonStyle(accent)}>
          Continue <span>→</span>
        </div>
      </div>
    </div>
  );
}
