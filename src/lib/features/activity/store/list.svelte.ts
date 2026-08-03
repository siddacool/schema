import { listActivity } from '../db';
import type { Activity } from '../types';

function createActivityListStore() {
  let activity = $state<Activity[]>([]);

  return {
    get activity() {
      return activity;
    },
    async load(planId: string) {
      activity = await listActivity(planId);
    },
  };
}

export const activityListStore = createActivityListStore();
