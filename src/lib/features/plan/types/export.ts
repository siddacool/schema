import type { Activity } from '$lib/features/activity/types';
import type { Plan } from '.';

export type ExportPlanData = {
  plan: Plan;
  activity: Activity[];
};

export const enum ExportPlanType {
  JSON = 'JSON',
}

export type ExportPlanTypeOption = {
  value: ExportPlanType;
  label: string;
};
