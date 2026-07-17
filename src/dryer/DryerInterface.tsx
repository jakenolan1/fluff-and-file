import type { CSSProperties } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH, DRYNESS_LEVELS, PROGRAMS, TEMPS } from './constants';
import { fmtClock } from './helpers';
import { RunningPill } from './RunningPill';
import { FluffFileWizard } from './screens/FluffFileWizard';
import { MainScreen } from './screens/MainScreen';
import { RunningScreen } from './screens/RunningScreen';
import { TopBar } from './TopBar';
import type { RingStyle } from './types';
import { useDryerState } from './useDryerState';

interface DryerInterfaceProps {
  accent?: string;
  ringStyle?: RingStyle;
}

export function DryerInterface({ accent = '#e23b64', ringStyle = 'glow' }: DryerInterfaceProps) {
  const state = useDryerState();
  const scale = state.vw / CANVAS_WIDTH;
  const p = PROGRAMS[state.prog];
  const isFF = state.screen.startsWith('ff-');
  const curDryness = p.timed ? state.timedMin + ' min' : DRYNESS_LEVELS[state.dryness];

  return (
    <div style={{ position: 'relative', width: '100%', height: (state.vw * CANVAS_HEIGHT) / CANVAS_WIDTH, overflow: 'hidden', background: '#050608' }}>
      <div
        style={
          {
            '--accent': accent,
            position: 'absolute',
            top: 0,
            left: 0,
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background:
              `radial-gradient(130% 95% at 50% -18%, color-mix(in oklab, ${accent} 13%, transparent), transparent 58%), ` +
              `radial-gradient(90% 80% at 50% 125%, color-mix(in oklab, ${accent} 6%, transparent), transparent 60%), #070809`,
            color: '#fff',
            fontFamily: 'Manrope, sans-serif',
            overflow: 'hidden',
          } as CSSProperties
        }
      >
        <TopBar accent={accent} clockLabel={fmtClock(new Date())} />

        {state.running && isFF && <RunningPill accent={accent} programName={p.name} remaining={state.remaining} />}

        {state.screen === 'main' && (
          <MainScreen
            accent={accent}
            ringStyle={ringStyle}
            prog={state.prog}
            selectProgram={state.selectProgram}
            dryness={state.dryness}
            setDryness={state.setDryness}
            tempIdx={state.tempIdx}
            setTempIdx={state.setTempIdx}
            timedMin={state.timedMin}
            changeTimed={state.changeTimed}
            delay={state.delay}
            changeDelay={state.changeDelay}
            steam={state.steam}
            setSteam={state.setSteam}
            sound={state.sound}
            setSound={state.setSound}
            onStart={state.startCycle}
            onOpenFF={() => state.setScreen('ff-intro')}
          />
        )}

        {state.screen === 'running' && (
          <RunningScreen
            accent={accent}
            curName={p.name}
            curTemp={TEMPS[state.tempIdx]}
            curDryness={curDryness}
            total={state.total}
            remaining={state.remaining}
            paused={state.paused}
            estFinish={state.estFinish}
            onPause={state.pauseCycle}
            onCancel={state.cancelCycle}
            onOpenFF={() => state.setScreen('ff-intro')}
          />
        )}

        {isFF && (
          <FluffFileWizard
            accent={accent}
            screen={state.screen}
            running={state.running}
            tax={state.tax}
            filePct={state.filePct}
            statusUpdates={state.statusUpdates}
            onField={state.setTaxField}
            onStatus={state.setTaxStatus}
            onItemized={state.setTaxItemized}
            onToggleDed={state.toggleDed}
            onNext={state.ffNext}
            onBack={state.ffBack}
            onGoHome={state.goHome}
            onChooseStatus={state.chooseStatus}
          />
        )}
      </div>
    </div>
  );
}
