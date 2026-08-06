import { SortOrder } from '$lib/features/shared/types/sort-order';
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
