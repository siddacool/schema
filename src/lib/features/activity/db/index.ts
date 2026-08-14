import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Activity, ActivityCreateData } from '../types';

export async function listActivity(planId: string) {
  const data = await db.activity.where({ planId }).toArray();

  return data.sort((a, b) => a.createdAt - b.createdAt);
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
  const { _id, ...restData } = data;
  const newId = _id || nanoid();

  const now = Date.now();

  await db.activity.add({
    _id: newId,
    ...restData,
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
  const target = await getActivityById(data._id);

  if (!target.id) {
    throw new Error('updateActivity: target.id not found');
  }

  await db.activity.update(target.id, {
    ...data,
    updatedAt: Date.now(),
  });

  return data._id;
}

export async function updateActivityBulk(data: Activity[]) {
  const now = Date.now();

  const formatedData = data.map((activity) => ({
    key: activity.id,
    changes: {
      ...activity,
      updatedAt: now,
    },
  }));

  return db.activity.bulkUpdate(formatedData);
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
