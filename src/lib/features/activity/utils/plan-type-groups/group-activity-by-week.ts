import type { Activity } from '../../types';
import { WeekDays } from '../../types/week';
import { getDaysOfWeek } from '../get-days-of-week';

export function sortWeekHeadings(
  headings: Activity[],
  startFrom: WeekDays = WeekDays.MON,
): Activity[] {
  const headingMap = new Map<WeekDays, Activity>();

  for (const heading of headings) {
    headingMap.set(heading.description as WeekDays, heading);
  }

  return getDaysOfWeek(startFrom)
    .map((day) => headingMap.get(day))
    .filter((heading): heading is Activity => Boolean(heading));
}

export function groupActivityByWeek(data: Activity[], startFrom: WeekDays = WeekDays.MON) {
  const headingsUnsorted: Activity[] = [];
  const activity: Activity[] = [];

  for (const item of data) {
    if (item.path === item._id) {
      headingsUnsorted.push(item);
    } else {
      activity.push(item);
    }
  }

  return [...sortWeekHeadings(headingsUnsorted, startFrom), ...activity];
}
