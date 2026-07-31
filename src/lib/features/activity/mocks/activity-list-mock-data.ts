import type { Activity } from '../types';

export const activityListMockData: Activity[] = [
  {
    _id: 'act-1',
    description: 'Push-ups #1',
    path: 'act-1',
    createdAt: 1785400060000,
    updatedAt: 1785400090000,
    planId: 'plan-1',
  },
  {
    _id: 'act-2',
    description: 'Visit Museum #2',
    createdAt: 1785400120000,
    updatedAt: 1785400150000,
    planId: 'plan-1',
    path: 'act-1.act-2',
  },
  {
    _id: 'act-3',
    description: 'Testing #3',
    createdAt: 1785400180000,
    updatedAt: 1785400210000,
    planId: 'plan-1',
    path: 'act-1.act-3',
  },
  {
    _id: 'act-4',
    description: 'Morning Workout #4',
    createdAt: 1785400240000,
    updatedAt: 1785400270000,
    planId: 'plan-1',
    path: 'act-1.act-4',
  },
  {
    _id: 'act-5',
    description: 'Deploy #5',
    createdAt: 1785400300000,
    updatedAt: 1785400330000,
    planId: 'plan-1',
    path: 'act-1.act-4.act-5',
  },
];
