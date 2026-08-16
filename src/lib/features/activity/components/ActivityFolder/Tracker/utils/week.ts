import type { ActivityGroup } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';
import { trackGroupItems } from './track-group-items';

export function trackActivityWeek(data: ActivityGroup[]) {
  const moment = createDate();
  const today = moment.format('ddd').toUpperCase();
  const currentTime = moment.format('HH:mm');
  let targetMain: ActivityGroup | undefined = undefined;

  for (const activity of data) {
    if (activity.description !== today) {
      continue;
    }

    targetMain = activity;
    break;
  }

  if (!targetMain) {
    return undefined;
  }

  const groupItems = trackGroupItems(targetMain.activity, currentTime);

  if (!groupItems.length) {
    return [targetMain];
  }

  return [targetMain, groupItems[0]];
}
