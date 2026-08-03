import { PlanType, type PlanTypeOption } from '../types/plan-type';

export const planTypeOptions: PlanTypeOption[] = [
  {
    value: PlanType.SEQUENCE,
    label: 'Sequence',
  },
  {
    value: PlanType.WEEK,
    label: 'Weekly',
  },
  {
    value: PlanType.CALENDAR,
    label: 'Calendar',
  },
];
