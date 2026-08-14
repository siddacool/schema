import {
  createActivity,
  deleteActivity as deleteActivityDb,
  updateActivityBulk as updateActivityBulkDb,
  bulkAddActivity as bulkAddActivityDb,
  deleteBulkActivity,
  getActivityById,
  listActivity,
  updateActivity,
} from '../db';
import { activityListStore } from '../store/list.svelte';
import type { Activity, ActivityCreateData } from '../types';
import {
  validateActivityCreate,
  validateActivityUpdate,
  validateActivityUpdateBulk,
  validateDeleteActivityByPlanId,
} from '../validation';

export async function saveActivity(data: ActivityCreateData | Activity) {
  if ('updatedAt' in data) {
    const { description, planId, ...restData } = data;

    const newData: Activity = {
      planId,
      description: description.trim(),
      ...restData,
    };

    validateActivityUpdate(data);

    const id = await updateActivity(newData);

    await activityListStore.syncBackup(planId);

    return id;
  } else {
    const { description, planId, ...restData } = data;

    const newData: ActivityCreateData = {
      planId,
      description: description.trim(),
      ...restData,
    };

    validateActivityCreate(newData);

    const id = await createActivity(newData);

    await activityListStore.syncBackup(planId);

    return id;
  }
}

export async function deleteActivity(id: string) {
  await deleteActivityDb(id);

  return id;
}

export async function deleteActivityNodes(planId: string, id: string) {
  const allActivitys = await listActivity(planId);
  const ids = allActivitys
    .filter((item) => item.path.includes(id))
    .filter((n) => n)
    .map((item) => item.id);

  if (!ids.length) {
    throw 'No ids found';
  }

  await deleteBulkActivity(ids as number[]);

  await activityListStore.syncBackup(planId);

  return ids;
}

export async function deleteActivityByPlanId(planId: string) {
  const planActivity = await listActivity(planId);

  if (!planActivity.length) {
    return;
  }

  const planActivityFiltred = planActivity.filter((item) => item.id);
  const planActivityKeys = planActivityFiltred.map((item) => item.id) as number[];

  validateDeleteActivityByPlanId(planActivityKeys);

  await deleteBulkActivity(planActivityKeys);

  return planActivityFiltred.map((item) => item._id);
}

export async function updateActivityFields(id: string, data: Partial<Activity>) {
  const activity = await getActivityById(id);

  return saveActivity({
    ...activity,
    ...data,
  });
}

export async function updateActivityBulk(planId: string, data: Activity[]) {
  validateActivityUpdateBulk(planId);

  if (!data.length) {
    return;
  }

  const newData: Activity[] = [];

  for (let i = 0; i < data.length; i++) {
    newData.push({
      ...data[i],
      planId,
    });
  }

  const ids = await updateActivityBulkDb(data);

  await activityListStore.syncBackup(planId);

  return ids;
}

export async function bulkAddActivity(data: Activity[]) {
  if (!data.length) {
    return;
  }

  const ids = await bulkAddActivityDb(data);

  return ids;
}
