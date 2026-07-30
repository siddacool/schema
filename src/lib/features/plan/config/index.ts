import { PlanType, type PlanTypeOption } from '../types/plan-type';

export const planTypeOptions: PlanTypeOption[] = [
  {
    value: PlanType.WEEK,
    label: 'Weekly',
  },
  {
    value: PlanType.CALENDAR,
    label: 'Calendar',
  },
  {
    value: PlanType.SEQUENCE,
    label: 'Sequence',
  },
];
