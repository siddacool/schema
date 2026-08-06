import { PlanType } from '$lib/features/plan/types/plan-type';
import type { SortOrder } from '$lib/features/shared/types/sort-order';
import type { Activity, ActivityGroup } from '../../types';
import type { WeekDays } from '../../types/week';
import { groupActivityTypeCalendar } from './planType/calendar';
import { groupActivityTypeWeek } from './planType/week';
import { splitActivity } from './split-activity';

export type GroupActivityConfig = {
  startOfWeek?: WeekDays;
  dateSortOrder?: SortOrder;
};

export function groupActivity(
  data: Activity[],
  planType: PlanType,
  config?: GroupActivityConfig,
): ActivityGroup[] {
  const { headings: headingsUnsorted, activity } = splitActivity(data);
  let headings = headingsUnsorted;

  switch (planType) {
    case PlanType.WEEK:
      headings = groupActivityTypeWeek(headingsUnsorted, config?.startOfWeek);
      break;

    case PlanType.CALENDAR:
      headings = groupActivityTypeCalendar(headingsUnsorted, config?.dateSortOrder);
      break;
  }

  const activityGroups: ActivityGroup[] = [];
  const groupMap = new Map<string, ActivityGroup>();

  for (const heading of headings) {
    const group: ActivityGroup = {
      ...heading,
      activity: [],
    };

    activityGroups.push(group);
    groupMap.set(group._id, group);
  }

  for (const item of activity) {
    const separatorIndex = item.path.indexOf('.');
    const headingId = separatorIndex === -1 ? item.path : item.path.slice(0, separatorIndex);

    const group = groupMap.get(headingId);
    if (!group) continue;

    group.activity.push(
      separatorIndex === -1
        ? item
        : {
            ...item,
            headerActivityId: item.path.slice(0, separatorIndex),
            path: item.path.slice(separatorIndex + 1),
          },
    );
  }

  return activityGroups;
}
