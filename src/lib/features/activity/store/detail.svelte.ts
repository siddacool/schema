import { getActivityById } from '../db';
import type { Activity } from '../types';

function createActivityDetailStore() {
  let activity = $state<Activity | undefined>(undefined);

  return {
    get activity() {
      return activity;
    },
    async load(activityId: string) {
      activity = await getActivityById(activityId);
    },
    clear() {
      activity = undefined;
    },
  };
}

export const activityDetailStore = createActivityDetailStore();
