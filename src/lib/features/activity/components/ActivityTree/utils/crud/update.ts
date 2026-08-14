import type { Activity } from '$lib/features/activity/types';

export async function activityTreeUpdate(value: Activity) {
  const { headerActivityId, ...restProps } = value;
  const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

  const updatedActivity: Activity = {
    ...restProps,
    path,
  };

  return updatedActivity;
}
