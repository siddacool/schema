import type { ActivityTreeRefvalue } from '../../types';

export async function activityTreeRemove(treeRef: ActivityTreeRefvalue | undefined, value: string) {
  if (!treeRef) {
    return;
  }

  const data = treeRef.getAllData();
  const targetData = data.find((item) => item._id === value);

  console.log('targetData', targetData, data, value);

  if (!targetData) {
    return;
  }

  const result = treeRef.removeNode(targetData.path);

  if (result.error) {
    console.error('Error:', result.error);
  }

  return value;
}
