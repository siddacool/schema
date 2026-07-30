import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Activity, ActivityCreateData } from '../types';

export async function listActivity(planId: string) {
  let activity = await db.activity.where({ planId }).toArray();

  activity = activity.sort((a, b) => b?.updatedAt - a?.updatedAt);

  return activity;
}

export async function listActivityByParentId(parentId: string) {
  const activity = await db.activity.where({ parentId }).toArray();

  return activity;
}

export async function getActivityById(id: string) {
  const activity = await db.activity.where({ _id: id }).first();

  if (!activity) {
    throw new Error('Activity not found');
  }

  return activity;
}

export async function createActivity(data: ActivityCreateData) {
  const newId = nanoid();

  const now = Date.now();

  await db.activity.add({
    _id: newId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function bulkAddActivity(activites: Activity[]) {
  await db.activity.bulkAdd(activites);

  return activites;
}

export async function updateActivity(data: Activity) {
  await db.activity.update(data.id, {
    ...data,
    updatedAt: Date.now(),
  });

  return data._id;
}

export async function deleteActivity(id: string) {
  const activity = await getActivityById(id);

  await db.activity.delete(activity.id);

  return id;
}

export async function deleteBulkActivity(ids: number[]) {
  await db.activity.bulkDelete(ids);

  return ids;
}
