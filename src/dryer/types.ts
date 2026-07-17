export type Screen =
  | 'main'
  | 'running'
  | 'ff-intro'
  | 'ff-personal'
  | 'ff-income'
  | 'ff-deductions'
  | 'ff-review'
  | 'ff-filing'
  | 'ff-done'
  | 'ff-confirm';

export type RingStyle = 'glow' | 'segments' | 'thin';

export interface Program {
  name: string;
  time: string;
  temp: string;
  desc: string;
  timed?: boolean;
}

export interface Deductions {
  home: boolean;
  dependents: boolean;
  charity: boolean;
  softener: boolean;
}

export interface TaxInfo {
  name: string;
  ssn: string;
  status: number;
  address: string;
  employer: string;
  wages: string;
  other: string;
  itemized: number;
  ded: Deductions;
}

export interface TaxResult {
  withheld: number;
  taxDue: number;
  credits: number;
  result: number;
}
