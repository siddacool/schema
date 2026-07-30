import { listActivity } from '../db';
import type { Activity } from '../types';

function createActivityListStore() {
  let activitys = $state<Activity[]>([]);

  return {
    get activitys() {
      return activitys;
    },
    async load() {
      activitys = await listActivity();
    },
  };
}

export const activityListStore = createActivityListStore();
