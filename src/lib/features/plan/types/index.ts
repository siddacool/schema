import type { WeekDays } from '$lib/features/activity/types/week';
import type { SortOrder } from '$lib/share/types/sort-order';
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
}

export interface PlanCreateData {
  name: string;
  type: PlanType;
  startOfWeek?: WeekDays;
}
