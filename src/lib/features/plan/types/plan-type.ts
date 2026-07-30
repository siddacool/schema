export const enum PlanType {
  WEEK = 'WEEK',
  CALENDAR = 'CALENDAR',
  SEQUENCE = 'SEQUENCE',
}

export type PlanTypeOption = {
  value: PlanType;
  label: string;
};
