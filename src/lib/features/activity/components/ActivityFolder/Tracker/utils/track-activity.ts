import type { Activity, ActivityGroup } from '$lib/features/activity/types';
import { PlanType } from '$lib/features/plan/types/plan-type';
import { trackActivityCalendar } from './calendar';
import { trackActivitySequence } from './sequence';
import { trackActivityWeek } from './week';

export function trackActivity(data: ActivityGroup[], planType: PlanType) {
  let tracked: Activity[] | undefined = undefined;

  if (planType === PlanType.WEEK) {
    tracked = trackActivityWeek(data);
  } else if (planType === PlanType.CALENDAR) {
    tracked = trackActivityCalendar(data);
  } else if (planType === PlanType.SEQUENCE) {
    tracked = trackActivitySequence(data);
  }

  return tracked;
}
