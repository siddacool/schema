import type { Activity } from '../../types';

function createActivityMiniDbStore() {
  let activity = $state<Activity[]>([]);

  return {
    get activity() {
      return activity;
    },
    async update(data: Activity[]) {
      activity = data;
    },
    async clear() {
      activity = [];
    },
  };
}

export const activityMiniDbStore = createActivityMiniDbStore();
