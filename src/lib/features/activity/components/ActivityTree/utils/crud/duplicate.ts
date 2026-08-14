import type { Activity } from '$lib/features/activity/types';
import type { ActivityTreeRefvalue } from '../../types';
import { removeHeaderActivityId } from '$lib/features/activity/utils/toggle-headerActivityId';
import { cloneActivity } from '$lib/features/activity/utils/clone-activity';
import { getAllChildren } from '$lib/features/activity/utils/get-all-children';
import { replaceActivityId } from '$lib/features/activity/utils/replace-activity-id';

function duplicateChildNodes(treeRef: ActivityTreeRefvalue, oldId: string, newId: string) {
  const data = treeRef.getAllData();
  const targetChildren = getAllChildren(oldId, data);

  const targetChildrenForNewId = replaceActivityId(targetChildren, oldId, newId);
  const clones: Activity[] = cloneActivity(targetChildrenForNewId, true);

  return clones;
}

function duplicateMainNode(duplicateTarget: Activity) {
  const newSortOrder = (duplicateTarget.sortOrder as number) + 1;

  const clone: Activity = cloneActivity([duplicateTarget], true)[0];

  clone.sortOrder = newSortOrder;

  return clone;
}

function createDuplicate(treeRef: ActivityTreeRefvalue, duplicateTarget: Activity) {
  const mainNode: Activity = duplicateMainNode(duplicateTarget);
  const clonedChildren = duplicateChildNodes(treeRef, duplicateTarget._id, mainNode._id);
  const allData: Activity[] = [];

  allData.push({
    ...mainNode,
    expanded: false,
  });

  for (const activity of clonedChildren) {
    allData.push({
      ...activity,
      expanded: false,
    });
  }

  return allData;
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

  const clonedItems = createDuplicate(treeRef, value);
  const mainNode = clonedItems[0];

  const siblings = siblingsToUpdate(treeRef, mainNode);

  return {
    create: removeHeaderActivityId(clonedItems),
    update: removeHeaderActivityId(siblings),
  };
}
