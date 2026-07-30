import { setLocalStoreData } from '$lib/utils/storage';
import { ACTIVE_PAGE_PLAN } from '../const';
import { planPageStore } from '../store/page.svelte';

export function updateActivePlan(planId: string) {
  setLocalStoreData<string | undefined>('local', ACTIVE_PAGE_PLAN, planId);

  planPageStore.updateActivePlan(planId);
}

export function clearActivePlan() {
  setLocalStoreData<string | undefined>('local', ACTIVE_PAGE_PLAN, undefined);

  planPageStore.updateActivePlan(undefined);
}
