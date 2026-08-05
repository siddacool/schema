import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
import { PlanType } from '$lib/features/plan/types/plan-type';
import { DEFAULT_DATE_SORT_ORDER } from '../const/calendar';
import { DEFAULT_START_OF_WEEK } from '../const/week';
import { listActivity } from '../db';
import type { Activity } from '../types';
import { groupActivityCalendar } from '../utils/plan-type-groups/group-activity-by-calendar';
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
      const startOfWeek = planDetails.startOfWeek || DEFAULT_START_OF_WEEK;
      const dateSortOrder = planDetails.dateSortOrder || DEFAULT_DATE_SORT_ORDER;
      const activityRaw = await listActivity(planId);

      if (planType === PlanType.WEEK) {
        activity = groupActivityByWeek(activityRaw, startOfWeek);
      } else if (planType === PlanType.CALENDAR) {
        activity = groupActivityCalendar(activityRaw, dateSortOrder);
      } else {
        activity = activityRaw;
      }
    },
  };
}

export const activityListStore = createActivityListStore();
