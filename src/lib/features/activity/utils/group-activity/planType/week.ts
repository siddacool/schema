import { DEFAULT_START_OF_WEEK } from '../../../const/week';
import type { Activity } from '../../../types';
import type { WeekDays } from '../../../types/week';
import { getDaysOfWeek } from '../../get-days-of-week';

export function groupActivityTypeWeek(
  headings: Activity[],
  startOfWeek: WeekDays = DEFAULT_START_OF_WEEK,
): Activity[] {
  const headingMap = new Map<WeekDays, Activity>();

  for (const heading of headings) {
    headingMap.set(heading.description as WeekDays, heading);
  }

  return getDaysOfWeek(startOfWeek)
    .map((day) => headingMap.get(day))
    .filter((heading): heading is Activity => Boolean(heading));
}
