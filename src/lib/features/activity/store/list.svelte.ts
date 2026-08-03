import { listActivity } from '../db';
import type { Activity } from '../types';

function createActivityListStore() {
  let activitys = $state<Activity[]>([]);

  return {
    get activitys() {
      return activitys;
    },
    async load(planId: string) {
      activitys = await listActivity(planId);
    },
  };
}

export const activityListStore = createActivityListStore();
