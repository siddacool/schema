import type { Activity } from '$lib/features/activity/types';
import { nanoid } from 'nanoid';
import type { ActivityTreeRefvalue } from '../../types';
import { removeHeaderActivityId } from '$lib/features/activity/utils/toggle-headerActivityId';

function createDuplicate(duplicateTarget: Activity) {
  const newSortOrder = (duplicateTarget.sortOrder as number) + 1;

  const now = Date.now();
  const _id = nanoid();

  const clone: Activity = {
    ...duplicateTarget,
    id: undefined,
    _id,
    createdAt: now,
    updatedAt: now,
    sortOrder: newSortOrder,
    path: duplicateTarget.path.replace(duplicateTarget._id, _id),
  };

  return clone;
}

function siblingsToUpdate(treeRef: ActivityTreeRefvalue, dupicateItem: Activity) {
  let parentPath =
    dupicateItem.path.lastIndexOf('.') === -1
      ? ''
      : dupicateItem.path.substring(0, dupicateItem.path.lastIndexOf('.'));

  if (!dupicateItem.headerActivityId) {
    parentPath = '';
  }

  const siblings = treeRef.getChildren(parentPath);
  const candidates: Activity[] = [];

  for (const sibling of siblings) {
    if (!sibling.data?.sortOrder) {
      continue;
    }

    if (sibling.data?.sortOrder < (dupicateItem?.sortOrder as number)) {
      continue;
    }

    candidates.push({
      ...sibling.data,
      sortOrder: sibling.data.sortOrder + 1,
    });
  }

  return candidates;
}

export async function activityTreeDuplicate(
  treeRef: ActivityTreeRefvalue | undefined,
  value: Activity,
) {
  if (!treeRef) {
    return;
  }

  if (!value.sortOrder) {
    return;
  }

  const dupicateItem = createDuplicate(value);
  const dupicateItemClean = removeHeaderActivityId([dupicateItem])[0];

  let parentPath =
    dupicateItem.path.lastIndexOf('.') === -1
      ? ''
      : dupicateItem.path.substring(0, dupicateItem.path.lastIndexOf('.'));

  if (!dupicateItem.headerActivityId) {
    parentPath = '';
  }

  treeRef.addNode(parentPath, { ...dupicateItem });

  const siblings = siblingsToUpdate(treeRef, dupicateItem);
  const siblingsClean = removeHeaderActivityId(siblings);

  for (const activity of siblings) {
    treeRef.updateNode(activity.path, {
      ...activity,
    });
  }

  return {
    create: [dupicateItemClean],
    update: siblingsClean,
  };
}
