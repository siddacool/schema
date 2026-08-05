import { SortOrder } from '$lib/share/types/sort-order';
import type { DateSortOrderOption } from '../types/calendar';

export const dateSortOrderOptions: DateSortOrderOption[] = [
  {
    value: SortOrder.ASCENDING,
    label: 'Oldest first',
  },
  {
    value: SortOrder.DESCENDING,
    label: 'Latest first',
  },
];
