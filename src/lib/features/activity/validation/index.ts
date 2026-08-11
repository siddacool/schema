import type { Activity, ActivityCreateData } from '../types';

export function validateActivityCreate(data: ActivityCreateData) {
  if (!data.planId) {
    throw new Error('tripId is required.');
  }

  if (!data.path) {
    throw new Error('Path is required.');
  }

  if (!data.description.trim()) {
    throw new Error('description is required.');
  }
}

export function validateActivityUpdate(data: Activity) {
  if (!data.planId) {
    throw new Error('tripId is required.');
  }

  if (!data.path) {
    throw new Error('Path is required.');
  }

  if (!data.description.trim()) {
    throw new Error('description is required.');
  }
}

export function validateDeleteActivityByPlanId(planActivityKeys: number[]) {
  if (!planActivityKeys.length) {
    throw new Error('Activities not found');
  }
}

export function validateActivityImport(planId: string) {
  if (!planId) {
    throw new Error('planId not found');
  }
}
