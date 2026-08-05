import { PlanType, type PlanTypeOption } from '../types/plan-type';

export const planTypeOptions: PlanTypeOption[] = [
  {
    value: PlanType.SEQUENCE,
    label: 'Sequence',
    description: `Step wise plan. Step 1, Step 2`,
  },
  {
    value: PlanType.WEEK,
    label: 'Daily routine',
    description: `Gym routines, Weekly goals`,
  },
  {
    value: PlanType.CALENDAR,
    label: 'Calendar',
    description: `Travel itinerary, Date wise plan`,
  },
];
