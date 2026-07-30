import type { Plan } from '.';

export type ExportPlanData = {
  plan: Plan;
};

export const enum ExportPlanType {
  JSON = 'JSON',
}

export type ExportPlanTypeOption = {
  value: ExportPlanType;
  label: string;
};
