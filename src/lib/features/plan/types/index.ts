import type { WeekDays } from '$lib/features/activity/types/week';
import type { SortOrder } from '$lib/features/shared/types/sort-order';
import type { PlanType } from './plan-type';

export interface Plan {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  type: PlanType;
  editMode?: boolean;
  startOfWeek?: WeekDays;
  dateSortOrder?: SortOrder;
  track?: boolean;
}

export interface PlanCreateData {
  name: string;
  type: PlanType;
  startOfWeek?: WeekDays;
  dateSortOrder?: SortOrder;
}
