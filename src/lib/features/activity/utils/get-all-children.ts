import type { Activity } from '../types';

export function getAllChildren(parentId: string | undefined, data: Activity[]) {
  const childrenData: Activity[] = [];

  if (!parentId) {
    for (const activity of data) {
      if (activity.path.includes('.')) {
        continue;
      }

      childrenData.push(activity);
    }

    return childrenData;
  }

  for (const activity of data) {
    if (activity._id === parentId) {
      continue;
    }

    if (!activity.path.includes(parentId)) {
      continue;
    }

    childrenData.push(activity);
  }

  return childrenData;
}
