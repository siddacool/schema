import type { Activity } from '$lib/features/activity/types';
import { PlanType } from '$lib/features/plan/types/plan-type';
import { trackActivityCalendar } from './calendar';
import { trackActivityWeek } from './week';

export function trackActivity(activity: Activity[], planType: PlanType, folderId: string) {
  let tracked: string[] | undefined = undefined;

  if (planType === PlanType.WEEK) {
    tracked = trackActivityWeek(activity, folderId);
  } else if (planType === PlanType.CALENDAR) {
    tracked = trackActivityCalendar(activity, folderId);
  }

  return tracked;
}
