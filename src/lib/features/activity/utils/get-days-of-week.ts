import { WeekDays } from '../types/week';

const WEEK_ORDER = [
  WeekDays.MON,
  WeekDays.TUE,
  WeekDays.WED,
  WeekDays.THU,
  WeekDays.FRI,
  WeekDays.SAT,
  WeekDays.SUN,
] as const;

export function getDaysOfWeek(startFrom: WeekDays = WeekDays.MON): WeekDays[] {
  const startIndex = WEEK_ORDER.indexOf(startFrom);

  return [...WEEK_ORDER.slice(startIndex), ...WEEK_ORDER.slice(0, startIndex)];
}
