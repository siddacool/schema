import { listPlans } from '../db';
import type { Plan } from '../types';

function createPlanListStore() {
  let plans = $state<Plan[]>([]);

  return {
    get plans() {
      return plans;
    },
    async load() {
      plans = await listPlans();
    },
  };
}

export const planListStore = createPlanListStore();
