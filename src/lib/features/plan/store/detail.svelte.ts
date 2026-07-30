import { getPlanById } from '../db';
import type { Plan } from '../types';

function createPlanDetailStore() {
  let plan = $state<Plan | undefined>(undefined);

  return {
    get plan() {
      return plan;
    },
    async load(planId: string) {
      plan = await getPlanById(planId);
    },
    clear() {
      plan = undefined;
    },
  };
}

export const planDetailStore = createPlanDetailStore();
