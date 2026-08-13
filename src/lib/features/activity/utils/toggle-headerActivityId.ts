import type { Activity } from '../types';

export function toggleHeaderActivityId(data: Activity[], addHeaderActivity: boolean) {
  const formattedData: Activity[] = [];

  if (addHeaderActivity) {
    for (const activity of data) {
      const separatorIndex = activity.path.indexOf('.');

      if (separatorIndex === -1) {
        formattedData.push(activity);
        continue;
      }

      formattedData.push({
        ...activity,
        headerActivityId: activity.path.slice(0, separatorIndex),
        path: activity.path.slice(separatorIndex + 1),
      });
    }
  } else {
    for (const activity of data) {
      const { headerActivityId, ...restProps } = activity;
      const path = headerActivityId ? `${headerActivityId}.${activity.path}` : activity.path;

      formattedData.push({
        ...restProps,
        path,
      });
    }
  }

  return formattedData;
}

export function addHeaderActivityId(data: Activity[]) {
  return toggleHeaderActivityId(data, true);
}

export function removeHeaderActivityId(data: Activity[]) {
  return toggleHeaderActivityId(data, false);
}
