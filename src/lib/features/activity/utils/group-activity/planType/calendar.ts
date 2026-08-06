import { SortOrder } from '$lib/features/shared/types/sort-order';
import { DEFAULT_DATE_SORT_ORDER } from '../../../const/calendar';
import type { Activity } from '../../../types';

export function groupActivityTypeCalendar(
  headings: Activity[],
  dateSortOrder: SortOrder = DEFAULT_DATE_SORT_ORDER,
): Activity[] {
  const headingsSorted =
    dateSortOrder === SortOrder.ASCENDING
      ? headings.sort((a, b) => a.description.localeCompare(b.description))
      : headings.sort((a, b) => b.description.localeCompare(a.description));

  return headingsSorted;
}
