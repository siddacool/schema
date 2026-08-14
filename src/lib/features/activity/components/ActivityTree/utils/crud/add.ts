import type { ActivityCreateFormData, ActivityGroup } from '$lib/features/activity/types';
import type { ActivityTreeRefvalue } from '../../types';

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

  const siblings = treeRef.getChildren(parentPath);
  const siblingsLength = siblings.length;
  const lastSiblingSortOrder = siblings.length
    ? siblings[siblings.length - 1].data?.sortOrder
    : undefined;

  value.sortOrder = (lastSiblingSortOrder || siblingsLength) + 1;

  const { headerActivityId, ...restProps } = value;

  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  const finalData: ActivityCreateFormData = {
    ...restProps,
    path,
  };

  return finalData;
}
