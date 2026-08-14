import { nanoid } from 'nanoid';
import type { Activity } from '../types';

function createIdMap(data: Activity[]): Record<string, string> {
  const idMap: Record<string, string> = {};

  for (const activity of data) {
    idMap[activity._id] = nanoid();
  }

  return idMap;
}

function clonePath(path: string, idMap: Record<string, string>): string {
  const parts = path.split('.');

  for (let i = 0; i < parts.length; i++) {
    parts[i] = idMap[parts[i]] ?? parts[i];
  }

  return parts.join('.');
}

export function cloneActivity(data: Activity[], updateTimings = false): Activity[] {
  const idMap = createIdMap(data);
  const clonedItems: Activity[] = [];

  const now = Date.now();

  for (const activity of data) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { id, ...rest } = activity;

    clonedItems.push({
      ...rest,
      _id: idMap[activity._id],
      path: clonePath(activity.path, idMap),
      createdAt: updateTimings ? now : activity.createdAt,
      updatedAt: updateTimings ? now : activity.updatedAt,
    });
  }

  return clonedItems;
}
