import type { Activity, ActivityExtended } from '../../types';

function getRelatedActivites(data: Activity[], activity: ActivityExtended): ActivityExtended[] {
  const sortedData: ActivityExtended[] = [];

  sortedData.push(activity);

  for (let i = 0; i < data.length; i++) {
    const target = data[i];

    if (target.parentId !== activity._id) {
      continue;
    }

    console.log('debug:', activity.level);

    const level = activity.level + 1;

    const targetActivityExtended: ActivityExtended = {
      ...target,
      level,
    };

    const children = getRelatedActivites(data, targetActivityExtended);

    sortedData.push(...children);
  }

  return sortedData;
}

export function getSortedActivities(data: Activity[]): ActivityExtended[] {
  const sortedData: ActivityExtended[] = [];
  const rootActivities = data.filter((item) => !item.parentId);

  if (!rootActivities.length) {
    return [];
  }

  for (let i = 0; i < rootActivities.length; i++) {
    const activityExtended: ActivityExtended = {
      ...rootActivities[i],
      level: 1,
    };

    const children = getRelatedActivites(data, activityExtended);

    sortedData.push(...children);
  }

  return sortedData;
}
