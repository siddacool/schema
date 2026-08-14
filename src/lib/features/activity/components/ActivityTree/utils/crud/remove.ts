import type { Activity } from '$lib/features/activity/types';

export async function activityTreeRemove(data: Activity[], value: string) {
  const targetData = data.find((item) => item._id === value);

  if (!targetData) {
    return;
  }

  return value;
}
