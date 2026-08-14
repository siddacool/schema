import type { Activity } from '$lib/features/activity/types';
import { getAllChildren } from '$lib/features/activity/utils/get-all-children';
import { removeHeaderActivityId } from '$lib/features/activity/utils/toggle-headerActivityId';

export function processChildrenExpandClose(parentId: string | undefined, data: Activity[]) {
  const children: Activity[] = getAllChildren(parentId, removeHeaderActivityId(data));
  const formatedData: Activity[] = [];

  for (const activity of children) {
    formatedData.push({
      ...activity,
      expanded: false,
    });
  }

  return formatedData;
}

export async function activityTreeExpand(
  value: Activity,
  expandState: boolean,
  data: Activity[],
): Promise<Activity[] | undefined> {
  const { headerActivityId, ...restProps } = value;
  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  const updatedActivity: Activity = {
    ...restProps,
    path,
    expanded: expandState,
  };

  // expand open only
  if (expandState === true) {
    return [updatedActivity];
  }

  const children = processChildrenExpandClose(value._id, data);

  return [updatedActivity, ...children];
}
