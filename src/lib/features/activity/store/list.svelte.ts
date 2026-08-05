import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
import { PlanType } from '$lib/features/plan/types/plan-type';
import { listActivity } from '../db';
import type { Activity } from '../types';
import { groupActivityByWeek } from '../utils/plan-type-groups/group-activity-by-week';

function createActivityListStore() {
  let activity = $state<Activity[]>([]);

  return {
    get activity() {
      return activity;
    },
    async load(planId: string) {
      const planDetails = planDetailStore.plan;

      if (planDetails?._id !== planId) {
        return;
      }

      const planType = planDetails.type;
      const activityRaw = await listActivity(planId);

      if (planType === PlanType.WEEK) {
        activity = groupActivityByWeek(activityRaw);
      } else {
        activity = activityRaw;
      }
    },
  };
}

export const activityListStore = createActivityListStore();
