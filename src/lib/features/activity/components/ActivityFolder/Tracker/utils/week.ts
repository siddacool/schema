import type { Activity } from '$lib/features/activity/types';
import { createDate } from '$lib/utils/date-time/createDate';
import { trackGroupActivity } from './track-group-activity';

export function trackActivityWeek(data: Activity[], folderId: string) {
  const today = createDate().format('ddd').toUpperCase();
  let targetMain: string | undefined = undefined;

  for (const activity of data) {
    if (activity.path.includes('.')) {
      continue;
    }

    if (activity.description !== today) {
      continue;
    }

    targetMain = activity._id;
    break;
  }

  if (!targetMain) {
    return undefined;
  }

  const groupActivity = trackGroupActivity(targetMain, folderId);

  if (!groupActivity) {
    return [targetMain];
  }

  return [targetMain, groupActivity];
}
