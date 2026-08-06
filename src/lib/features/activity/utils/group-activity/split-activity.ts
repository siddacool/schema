import type { Activity } from '../../types';

export function splitActivity(data: Activity[]) {
  const headings: Activity[] = [];
  const activity: Activity[] = [];

  for (const item of data) {
    console.log('debug:', item._id, item);

    if (item.path === item._id) {
      headings.push(item);
    } else {
      activity.push(item);
    }
  }

  return {
    headings,
    activity,
  };
}
