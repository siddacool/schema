import type { Activity } from '../types';

export function replaceActivityId(children: Activity[], oldId: string, newId: string): Activity[] {
  if (oldId === newId) {
    return children;
  }

  const regex = new RegExp(`(^|\\.)${oldId}(?=\\.|$)`, 'g');
  const result: Activity[] = [];

  for (const activity of children) {
    result.push({
      ...activity,
      path: activity.path.replace(regex, `$1${newId}`),
    });
  }

  return result;
}
