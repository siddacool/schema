import type { Activity } from '$lib/features/activity/types';
import { getAllChildren } from '$lib/features/activity/utils/get-all-children';
import {
  addHeaderActivityId,
  removeHeaderActivityId,
} from '$lib/features/activity/utils/toggle-headerActivityId';
import type { ActivityTreeRefvalue } from '../../types';

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
  treeRef: ActivityTreeRefvalue | undefined,
  value: Activity,
  expandState: boolean,
  data: Activity[],
): Promise<Activity[] | undefined> {
  if (!treeRef) {
    return;
  }

  const result = treeRef.updateNode(value.path, {
    ...value,
    expanded: expandState,
  });

  if (result.error) {
    console.error('Error:', result.error);
  }

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
  const childrenTree = addHeaderActivityId(children);

  for (const activity of childrenTree) {
    treeRef.updateNode(activity.path, {
      ...activity,
      expanded: false,
    });
  }

  return [updatedActivity, ...children];
}
