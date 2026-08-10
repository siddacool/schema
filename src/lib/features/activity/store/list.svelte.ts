import { listActivity } from '../db';
import type { Activity } from '../types';

function createActivityListStore() {
  let activity = $state<Activity[]>([]);
  let activityBackup = $state<Activity[]>([]);

  return {
    get activity() {
      return activity;
    },
    get activityBackup() {
      return activityBackup;
    },
    async load(planId: string) {
      const activityRaw = await listActivity(planId);

      activity = activityRaw;
      activityBackup = activity;
    },
    async syncBackup(planId: string) {
      const activityRaw = await listActivity(planId);
      activityBackup = activityRaw;
    },
  };
}

export const activityListStore = createActivityListStore();
