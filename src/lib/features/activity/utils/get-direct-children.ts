import type { Activity } from '../types';

export function getDirectChildren(parentId: string | undefined, data: Activity[]) {
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
    const pathParts = activity.path.split('.');

    if (pathParts.length < 2) {
      continue;
    }

    const secondLastId = pathParts[pathParts.length - 2];

    if (secondLastId !== parentId) {
      continue;
    }

    childrenData.push(activity);
  }

  return childrenData;
}
