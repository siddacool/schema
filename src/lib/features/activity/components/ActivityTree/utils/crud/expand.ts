import type { Activity } from '$lib/features/activity/types';
import type { ActivityTreeRefvalue } from '../../types';

export async function activityTreeExpand(
  treeRef: ActivityTreeRefvalue | undefined,
  value: Activity,
) {
  if (!treeRef) {
    return;
  }

  const result = treeRef.updateNode(value.path, value);

  if (result.error) {
    console.error('Error:', result.error);
  }

  const { headerActivityId, ...restProps } = value;
  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  const updatedActivity: Activity = {
    ...restProps,
    path,
  };

  return updatedActivity;
}
