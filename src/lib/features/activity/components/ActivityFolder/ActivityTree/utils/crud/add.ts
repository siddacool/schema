import type { Activity, ActivityCreateFormData, ActivityGroup } from '$lib/features/activity/types';
import type { ActivityTreeRefvalue } from '../../ActivityTree.svelte';

export async function activityTreeAdd(
  treeRef: ActivityTreeRefvalue | undefined,
  valueRaw: ActivityCreateFormData,
  data: ActivityGroup,
) {
  if (!treeRef) {
    return;
  }

  const value = {
    ...valueRaw,
  };

  const now = Date.now();
  const newNode: Activity = {
    ...value,
    createdAt: now,
    updatedAt: now,
    planId: '',
  };

  const groupId = data._id;

  if (!value.path.startsWith(groupId)) {
    value.headerActivityId = groupId;
  }

  let parentPath =
    value.path.lastIndexOf('.') === -1 ? '' : value.path.substring(0, value.path.lastIndexOf('.'));

  if (!value.headerActivityId) {
    parentPath = '';
  }

  const result = treeRef.addNode(parentPath, { ...newNode });

  if (result.error) {
    console.error('Error:', result.error);
  }

  const { headerActivityId, ...restProps } = value;

  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  await treeRef.expandNodes(parentPath);

  const finalData: ActivityCreateFormData = {
    ...restProps,
    path,
  };

  return finalData;
}
