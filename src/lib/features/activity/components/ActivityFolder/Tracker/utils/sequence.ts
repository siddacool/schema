import type { Activity, ActivityGroup } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';
import { trackGroupItems } from './track-group-items';

export function trackActivitySequence(data: ActivityGroup[]) {
  const aggrigate: Activity[] = [];

  const currentTime = createDate().format('HH:mm');
  for (const activity of data) {
    aggrigate.push(activity);
    aggrigate.push(...activity.activity);
    break;
  }

  const groupItems = trackGroupItems(aggrigate, currentTime);

  if (!groupItems.length) {
    return undefined;
  }

  return [groupItems[0]];
}
