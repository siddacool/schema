import { createPlan, deletePlan as deletePlanDb, getPlanById, updatePlan } from '../db';
import { planDetailStore } from '../store/detail.svelte';
import type { Plan, PlanCreateData } from '../types';
import { validatePlanCreate, validatePlanUpdate } from '../validation';

export async function savePlan(data: PlanCreateData | Plan) {
  if ('_id' in data) {
    const { name, ...restData } = data;

    const newData: Plan = {
      name: name.trim(),
      ...restData,
    };

    validatePlanUpdate(data);

    const id = await updatePlan(newData);

    planDetailStore.load(data._id);

    return id;
  } else {
    const { name, ...restData } = data;

    const newData: PlanCreateData = {
      name: name.trim(),
      ...restData,
    };

    validatePlanCreate(newData);

    return await createPlan(newData);
  }
}

export async function deletePlan(id: string) {
  await deletePlanDb(id);

  return id;
}

export async function updatePlanFields(id: string, data: Partial<Plan>) {
  const plan = await getPlanById(id);

  return savePlan({
    ...plan,
    ...data,
  });
}
