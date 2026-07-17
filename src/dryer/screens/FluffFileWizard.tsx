import { computeTaxResult } from '../helpers';
import type { Deductions, Screen, TaxInfo } from '../types';
import { Confirm } from './ff/Confirm';
import { DeductionsStep } from './ff/Deductions';
import { Done } from './ff/Done';
import { Filing } from './ff/Filing';
import { Income } from './ff/Income';
import { Intro } from './ff/Intro';
import { Personal } from './ff/Personal';
import { Rail } from './ff/Rail';
import { Review } from './ff/Review';

interface FluffFileWizardProps {
  accent: string;
  screen: Screen;
  running: boolean;
  tax: TaxInfo;
  filePct: number;
  statusUpdates: boolean | null;
  onField: (field: keyof TaxInfo) => (value: string) => void;
  onStatus: (i: number) => void;
  onItemized: (i: number) => void;
  onToggleDed: (k: keyof Deductions) => void;
  onNext: () => void;
  onBack: () => void;
  onGoHome: () => void;
  onChooseStatus: (v: boolean) => void;
}

export function FluffFileWizard({
  accent,
  screen,
  running,
  tax,
  filePct,
  statusUpdates,
  onField,
  onStatus,
  onItemized,
  onToggleDed,
  onNext,
  onBack,
  onGoHome,
  onChooseStatus,
}: FluffFileWizardProps) {
  const backLabel = screen === 'ff-intro' ? 'Close concierge' : 'Back';
  const result = computeTaxResult(tax);

  return (
    <div style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, display: 'flex' }}>
      <Rail accent={accent} screen={screen} backLabel={backLabel} onBack={onBack} />

      <div style={{ flex: 1, position: 'relative' }}>
        {screen === 'ff-intro' && <Intro accent={accent} onNext={onNext} />}
        {screen === 'ff-personal' && <Personal accent={accent} tax={tax} onField={onField} onStatus={onStatus} onNext={onNext} />}
        {screen === 'ff-income' && <Income accent={accent} tax={tax} onField={onField} onNext={onNext} />}
        {screen === 'ff-deductions' && (
          <DeductionsStep accent={accent} tax={tax} credits={result.credits} onToggle={onToggleDed} onItemized={onItemized} onNext={onNext} />
        )}
        {screen === 'ff-review' && <Review accent={accent} tax={tax} result={result} onNext={onNext} />}
        {screen === 'ff-filing' && <Filing accent={accent} filePct={filePct} />}
        {screen === 'ff-done' && <Done accent={accent} result={result} onStatusYes={() => onChooseStatus(true)} onStatusNo={() => onChooseStatus(false)} />}
        {screen === 'ff-confirm' && <Confirm accent={accent} running={running} statusUpdates={statusUpdates} onGoHome={onGoHome} />}
      </div>
    </div>
  );
}
