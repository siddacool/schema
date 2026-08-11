import type { Activity } from '../types';
import { cloneActivity } from '../utils/clone-activity';
import { validateActivityImport } from '../validation';
import { bulkAddActivity } from './crud.svelte';

function addPlanDetails(planId: string, data: Activity[]) {
  const newData: Activity[] = [];

  for (const activity of data) {
    newData.push({
      ...activity,
      planId,
    });
  }

  return newData;
}

export async function importActivity(planId: string, data: Activity[]) {
  validateActivityImport(planId);

  const activity = addPlanDetails(planId, data);
  const activityCloned = cloneActivity(activity);
  const ids = await bulkAddActivity(activityCloned);

  return ids;
}
