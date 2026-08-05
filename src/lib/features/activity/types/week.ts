export const enum WeekDays {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
  SUN = 'SUN',
}

export type DaysOption = {
  value: WeekDays;
  label: string;
  labelMini: string;
};
