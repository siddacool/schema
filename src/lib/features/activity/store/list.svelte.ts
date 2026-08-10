import { listActivity } from '../db';
import type { Activity } from '../types';

function createActivityListStore() {
  let activity = $state<Activity[]>([]);

  return {
    get activity() {
      return activity;
    },
    async load(planId: string) {
      const activityRaw = await listActivity(planId);

      activity = activityRaw;
    },
  };
}

export const activityListStore = createActivityListStore();
