import { useCallback, useEffect, useRef, useState } from 'react';
import { FF_ORDER, PROGRAMS } from './constants';
import { computeTaxResult, fmtClock, totalMin } from './helpers';
import type { Deductions, Screen, TaxInfo } from './types';

const INITIAL_TAX: TaxInfo = {
  name: 'Alexandra Whitfield',
  ssn: '•••–••–1979',
  status: 0,
  address: '14 Maple Court, Fairhaven',
  employer: 'Northlight Media Group',
  wages: '92,400',
  other: '3,150',
  itemized: 0,
  ded: { home: true, dependents: false, charity: true, softener: false },
};

export function useDryerState() {
  const [screen, setScreen] = useState<Screen>('main');
  const [prog, setProg] = useState(1);
  const [dryness, setDryness] = useState(2);
  const [tempIdx, setTempIdx] = useState(2);
  const [delay, setDelay] = useState(0);
  const [steam, setSteam] = useState(false);
  const [sound, setSound] = useState(true);
  const [timedMin, setTimedMin] = useState(60);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [estFinish, setEstFinish] = useState('');
  const [tax, setTax] = useState<TaxInfo>(INITIAL_TAX);
  const [filePct, setFilePct] = useState(0);
  const [statusUpdates, setStatusUpdates] = useState<boolean | null>(null);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1400);
  const [, setClockTick] = useState(0);

  const cycleTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const fileTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    const clockTimer = setInterval(() => setClockTick((t) => t + 1), 30000);
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      clearInterval(clockTimer);
      clearInterval(cycleTimer.current);
      clearInterval(fileTimer.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const changeDelay = useCallback((d: number) => {
    setDelay((v) => Math.max(0, Math.min(12, v + d)));
  }, []);

  const changeTimed = useCallback((d: number) => {
    setTimedMin((v) => Math.max(5, Math.min(300, v + d)));
  }, []);

  const toggleDed = useCallback((k: keyof Deductions) => {
    setTax((t) => ({ ...t, ded: { ...t.ded, [k]: !t.ded[k] } }));
  }, []);

  const setTaxField = useCallback(
    (field: keyof TaxInfo) => (value: string) => {
      setTax((t) => ({ ...t, [field]: value }));
    },
    [],
  );

  const startCycle = useCallback(() => {
    const p = PROGRAMS[prog];
    const t = p.timed ? timedMin : totalMin(p);
    setScreen('running');
    setRunning(true);
    setPaused(false);
    setTotal(t);
    setRemaining(t);
    setEstFinish(fmtClock(new Date(Date.now() + t * 60000)));

    clearInterval(cycleTimer.current);
    cycleTimer.current = setInterval(() => {
      setPaused((isPaused) => {
        if (isPaused) return isPaused;
        setRemaining((r) => {
          const next = r - 1;
          if (next <= 0) {
            clearInterval(cycleTimer.current);
            setRunning(false);
            return 0;
          }
          return next;
        });
        return isPaused;
      });
    }, 1000);
  }, [prog, timedMin]);

  const pauseCycle = useCallback(() => setPaused((p) => !p), []);

  const cancelCycle = useCallback(() => {
    clearInterval(cycleTimer.current);
    setScreen('main');
    setRunning(false);
    setPaused(false);
  }, []);

  const file = useCallback(() => {
    setScreen('ff-filing');
    setFilePct(0);
    clearInterval(fileTimer.current);
    fileTimer.current = setInterval(() => {
      setFilePct((p) => {
        const next = p + 3;
        if (next >= 100) {
          clearInterval(fileTimer.current);
          setTimeout(() => setScreen('ff-done'), 450);
          return 100;
        }
        return next;
      });
    }, 70);
  }, []);

  const ffNext = useCallback(() => {
    setScreen((cur) => {
      const i = FF_ORDER.indexOf(cur);
      if (i === FF_ORDER.length - 1) {
        file();
        return cur;
      }
      if (i >= 0) return FF_ORDER[i + 1];
      return 'ff-intro';
    });
  }, [file]);

  const ffBack = useCallback(() => {
    setScreen((cur) => {
      const i = FF_ORDER.indexOf(cur);
      if (i <= 0) return running ? 'running' : 'main';
      return FF_ORDER[i - 1];
    });
  }, [running]);

  const goHome = useCallback(() => {
    setScreen(running ? 'running' : 'main');
  }, [running]);

  const chooseStatus = useCallback((v: boolean) => {
    setStatusUpdates(v);
    setScreen('ff-confirm');
  }, []);

  return {
    screen,
    prog,
    dryness,
    tempIdx,
    delay,
    steam,
    sound,
    timedMin,
    total,
    remaining,
    running,
    paused,
    estFinish,
    tax,
    filePct,
    statusUpdates,
    vw,

    setScreen,
    selectProgram: setProg,
    setDryness,
    setTempIdx,
    setSteam: () => setSteam((s) => !s),
    setSound: () => setSound((s) => !s),
    changeDelay,
    changeTimed,
    toggleDed,
    setTaxField,
    setTaxStatus: (i: number) => setTax((t) => ({ ...t, status: i })),
    setTaxItemized: (i: number) => setTax((t) => ({ ...t, itemized: i })),
    startCycle,
    pauseCycle,
    cancelCycle,
    ffNext,
    ffBack,
    goHome,
    chooseStatus,
    computeResult: () => computeTaxResult(tax),
  };
}

export type DryerState = ReturnType<typeof useDryerState>;
