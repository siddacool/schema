import { savePlan } from './crud.svelte';
import type { ExportPlanData } from '../types/export';
import { validatePlanImport } from '../validation';
import { planListStore } from '../store/list.svelte';

export async function importPlan(data: ExportPlanData) {
  validatePlanImport(data);

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { _id, id, ...restProps } = data.plan;

  const planId = await savePlan({ ...restProps });

  console.log('debug:', planId);

  await planListStore.load();
}
