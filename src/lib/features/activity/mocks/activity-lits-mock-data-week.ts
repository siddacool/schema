import type { Activity } from '../types';
import { WeekDays } from '../types/week';

export const activityListMockDataWeek: Activity[] = [
  {
    _id: 'act-1',
    description: WeekDays.MON,
    path: 'act-1',
    createdAt: 1785400060000,
    updatedAt: 1785400090000,
    planId: 'plan-1',
  },
];
