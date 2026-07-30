import {
  createActivity,
  deleteActivity as deleteActivityDb,
  deleteBulkActivity,
  getActivityById,
  listActivity,
  listActivityByParentId,
  updateActivity,
} from '../db';
import { activityDetailStore } from '../store/detail.svelte';
import type { Activity, ActivityCreateData } from '../types';
import {
  validateActivityCreate,
  validateActivityUpdate,
  validateDeleteActivityByPlanId,
} from '../validation';

export async function saveActivity(data: ActivityCreateData | Activity) {
  if ('_id' in data) {
    const { description, ...restData } = data;

    const newData: Activity = {
      description: description.trim(),
      ...restData,
    };

    validateActivityUpdate(data);

    const id = await updateActivity(newData);

    activityDetailStore.load(data._id);

    return id;
  } else {
    const { description, ...restData } = data;

    const newData: ActivityCreateData = {
      description: description.trim(),
      ...restData,
    };

    validateActivityCreate(newData);

    return await createActivity(newData);
  }
}

export async function deleteActivity(id: string) {
  await deleteActivityDb(id);

  const activityByParentId = await listActivityByParentId(id);

  if (activityByParentId.length) {
    const activityFiltred = activityByParentId.filter((item) => item.id);
    const activityKeys = activityFiltred.map((item) => item.id) as number[];

    if (activityKeys.length) {
      await deleteBulkActivity(activityKeys);
    }
  }

  return id;
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
