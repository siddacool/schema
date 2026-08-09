import { SortOrder } from '$lib/features/shared/types/sort-order';
import { createDate } from '$lib/utils/date-time/createDate';
import { parseDate } from '@internationalized/date';
import type { Activity, ActivityGroup } from '../types';
import { groupActivityTypeCalendar } from './group-activity/planType/calendar';

export function getSuggestedDate(groups: ActivityGroup[], currentData?: Activity) {
  if (currentData?.description) {
    return undefined;
  }

  const sortedDates = groupActivityTypeCalendar(groups, SortOrder.ASCENDING);

  if (!sortedDates.length) {
    return undefined;
  }

  const lastDate = createDate(sortedDates[sortedDates.length - 1]?.description);

  if (!lastDate.isValid()) {
    return undefined;
  }

  const newDate = lastDate.add(1, 'day').format('YYYY-MM-DD');

  return parseDate(newDate);
}
