import type { Program, Screen } from './types';

export const DEFAULT_ACCENT = '#e23b64';
export const ACCENT_OPTIONS = ['#e23b64', '#e0a63b', '#4db6e2', '#c9ccd4'];

export const PROGRAMS: Program[] = [
  { name: 'Quick 40′', time: '0:40', temp: 'Medium', desc: 'A rapid refresh for lightly worn garments.' },
  { name: 'Cottons', time: '1:58', temp: 'High', desc: 'Thorough, even drying for everyday cottons.' },
  { name: 'Synthetics', time: '1:12', temp: 'Medium', desc: 'Measured care for blends and activewear.' },
  { name: 'Delicates', time: '0:52', temp: 'Low', desc: 'Low-heat protection for your finest fabrics.' },
  { name: 'Towels', time: '2:20', temp: 'High', desc: 'Deep drying for heavy loops and terry.' },
  { name: 'Bedding', time: '2:05', temp: 'High', desc: 'Balanced drying for duvets and linens.' },
  { name: 'Air Fluff', time: '0:25', temp: 'No heat', desc: 'A cool tumble to freshen without heat.' },
  { name: 'Timed Dry', time: '1:00', temp: 'Medium', desc: 'You set the clock — we tumble for exactly that long.', timed: true },
];

export const DRYNESS_LEVELS = ['Iron Dry', 'Cupboard', 'Cupboard +', 'Extra Dry'];
export const TEMPS = ['Low', 'Medium', 'High'];

export const FF_ORDER: Screen[] = ['ff-intro', 'ff-personal', 'ff-income', 'ff-deductions', 'ff-review'];

export const CIRC = 2 * Math.PI * 270;

// virtual design canvas the whole interface scales to fit
export const CANVAS_WIDTH = 2556;
export const CANVAS_HEIGHT = 1179;

// rotary dial geometry
export const DIAL_CX = 740;
export const DIAL_CY = 460;
export const DIAL_RL = 430; // label radius
export const DIAL_RN1 = 115; // needle inner radius
export const DIAL_RN2 = 312; // needle outer radius
export const DIAL_RB = 330; // needle bulb radius
export const DIAL_A0 = 118; // first programme angle (deg)
export const DIAL_A1 = 242; // last programme angle (deg)
