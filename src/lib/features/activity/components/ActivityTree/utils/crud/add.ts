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

  const groupId = data._id;

  const value = {
    ...valueRaw,
    headerActivityId: valueRaw.path.startsWith(groupId) ? valueRaw.headerActivityId : groupId,
  };

  let parentPath =
    value.path.lastIndexOf('.') === -1 ? '' : value.path.substring(0, value.path.lastIndexOf('.'));

  if (!value.headerActivityId) {
    parentPath = '';
  }

  const sublings = treeRef.getChildren(parentPath);
  const sublingsLength = sublings.length;
  const lastSiblingSortOrder = sublings.length
    ? sublings[sublings.length - 1].data?.sortOrder
    : undefined;

  value.sortOrder = (lastSiblingSortOrder || sublingsLength) + 1;

  const now = Date.now();
  const newNode: Activity = {
    ...value,
    createdAt: now,
    updatedAt: now,
    planId: '',
  };

  const result = treeRef.addNode(parentPath, { ...newNode });

  if (result.error) {
    console.error('Error:', result.error);
  }

  const { headerActivityId, ...restProps } = value;

  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  const finalData: ActivityCreateFormData = {
    ...restProps,
    path,
  };

  return finalData;
}
