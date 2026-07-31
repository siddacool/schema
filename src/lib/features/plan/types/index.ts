import type { PlanType } from './plan-type';

export interface Plan {
  id?: number;
  _id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  type: PlanType;
}

export interface PlanCreateData {
  name: string;
  type: PlanType;
}
