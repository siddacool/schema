import { getLocalStoreData } from '$lib/utils/storage';
import { ACTIVE_PAGE_PLAN } from '../const';

const dataFromStorage = getLocalStoreData<string | undefined>('local', ACTIVE_PAGE_PLAN);

function createPlanPageStore() {
  let activePlan: string | undefined = $state(dataFromStorage);

  return {
    get activePlan() {
      return activePlan;
    },
    updateActivePlan(planId: string | undefined) {
      activePlan = planId;
    },
  };
}

export const planPageStore = createPlanPageStore();
