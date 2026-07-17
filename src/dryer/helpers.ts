import type { Program, TaxInfo, TaxResult } from './types';

export function parseNum(s: string): number {
  return Number(String(s).replace(/[^0-9.]/g, '')) || 0;
}

export function fmtTime(min: number): string {
  min = Math.max(0, Math.round(min));
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h + ':' + String(m).padStart(2, '0');
}

export function fmtClock(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + String(m).padStart(2, '0') + ' ' + ap;
}

export function money(n: number): string {
  return '$' + Math.round(Math.abs(n)).toLocaleString('en-US');
}

export function totalMin(p: Program): number {
  const [h, m] = p.time.split(':').map(Number);
  return h * 60 + m;
}

const WITHHELD = 16800;

export function computeTaxResult(tax: TaxInfo): TaxResult {
  const wages = parseNum(tax.wages);
  const other = parseNum(tax.other);
  const taxDue = Math.round(wages * 0.19 + other * 0.24);
  const d = tax.ded;
  const credits =
    (d.home ? 3500 : 0) +
    (d.dependents ? 4200 : 0) +
    (d.charity ? 1800 : 0) +
    (d.softener ? 900 : 0) +
    (tax.itemized ? 2600 : 0);
  return { withheld: WITHHELD, taxDue, credits, result: WITHHELD - taxDue + credits };
}
