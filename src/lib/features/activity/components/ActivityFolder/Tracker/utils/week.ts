import type { Activity, ActivityGroup } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';

export function trackActivityWeek(data: ActivityGroup[]) {
  const today = createDate().format('ddd').toUpperCase();
  let targetMain: Activity | undefined = undefined;

  for (const item of data) {
    if (item.description !== today) {
      continue;
    }

    targetMain = item;
    break;
  }

  if (!targetMain) {
    return undefined;
  }

  return [targetMain];
}
