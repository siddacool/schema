import { db } from '$lib/db';
import { nanoid } from 'nanoid/non-secure';
import type { Plan, PlanCreateData } from '../types';

export async function listPlans() {
  let plans = await db.plans.toArray();

  plans = plans.sort((a, b) => b?.updatedAt - a?.updatedAt);

  return plans;
}

export async function getPlanById(id: string) {
  const plan = await db.plans.where({ _id: id }).first();

  if (!plan) {
    throw new Error('Plan not found');
  }

  return plan;
}

export async function createPlan(data: PlanCreateData) {
  const newId = nanoid();

  const now = Date.now();

  await db.plans.add({
    _id: newId,
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return newId;
}

export async function updatePlan(data: Plan) {
  await db.plans.update(data.id, {
    ...data,
    updatedAt: Date.now(),
  });

  return data._id;
}

export async function deletePlan(id: string) {
  const plan = await getPlanById(id);

  await db.plans.delete(plan.id);

  return id;
}
