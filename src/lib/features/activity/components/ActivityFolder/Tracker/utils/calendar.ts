import type { Activity, ActivityGroup } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';

export function trackActivityCalendar(data: ActivityGroup[]) {
  const today = createDate().format('YYYY-MM-DD');
  let targetMain: Activity | undefined = undefined;

  for (const activity of data) {
    if (activity.path.includes('.')) {
      continue;
    }

    if (activity.description !== today) {
      continue;
    }

    targetMain = activity;
    break;
  }

  if (!targetMain) {
    return undefined;
  }

  return [targetMain];
}
