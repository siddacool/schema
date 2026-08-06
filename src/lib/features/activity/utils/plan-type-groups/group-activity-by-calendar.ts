import { SortOrder } from '$lib/features/shared/types/sort-order';
import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
import type { Activity } from '../../types';

export function groupActivityCalendar(
  data: Activity[],
  order: SortOrder = DEFAULT_DATE_SORT_ORDER,
) {
  const headingsUnsorted: Activity[] = [];
  const activity: Activity[] = [];

  for (const item of data) {
    if (item.path === item._id) {
      headingsUnsorted.push(item);
    } else {
      activity.push(item);
    }
  }

  const headings =
    order === SortOrder.ASCENDING
      ? headingsUnsorted.sort((a, b) => a.description.localeCompare(b.description))
      : headingsUnsorted.sort((a, b) => b.description.localeCompare(a.description));

  return [...headings, ...activity];
}
