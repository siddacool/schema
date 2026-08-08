import { daysOptions } from '../config/week';
import type { Activity, ActivityGroup } from '../types';
import { WeekDays, type DaysOption } from '../types/week';

export function getAvailableDays(groups: ActivityGroup[], currentData?: Activity): DaysOption[] {
  const currentDay = currentData?.description as WeekDays | undefined;

  const groupDays = new Set(groups.map(({ description }) => description as WeekDays));

  return daysOptions.filter(({ value }) => value === currentDay || !groupDays.has(value));
}
