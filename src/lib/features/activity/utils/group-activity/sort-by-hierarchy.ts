import type { Activity } from '../../types';

export function sortActivitiesByHierarchy(activities: Activity[]): Activity[] {
  const childrenMap = new Map<string, Activity[]>();

  for (const activity of activities) {
    const lastDot = activity.path.lastIndexOf('.');
    const parentPath = lastDot === -1 ? '' : activity.path.slice(0, lastDot);

    const children = childrenMap.get(parentPath);

    if (children) {
      children.push(activity);
    } else {
      childrenMap.set(parentPath, [activity]);
    }
  }

  // Sort siblings by their own sortOrder
  for (const children of childrenMap.values()) {
    children.sort((a, b) => {
      const aOrder = a.sortOrder ?? 0;
      const bOrder = b.sortOrder ?? 0;

      return aOrder - bOrder;
    });
  }

  const result: Activity[] = [];

  function traverse(parentPath: string) {
    const children = childrenMap.get(parentPath) ?? [];

    for (const child of children) {
      result.push(child);
      traverse(child.path);
    }
  }

  // Start with the first level inside the group
  traverse('');

  return result;
}
