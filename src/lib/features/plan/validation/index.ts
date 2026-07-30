import type { Plan, PlanCreateData } from '../types';
import type { ExportPlanData } from '../types/export';

export function validatePlanCreate(data: PlanCreateData) {
  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }

  if (!data.type.trim()) {
    throw new Error('Type is required.');
  }
}

export function validatePlanUpdate(data: Plan) {
  if (!data.name.trim()) {
    throw new Error('Name is required.');
  }

  if (!data.type.trim()) {
    throw new Error('Type is required.');
  }
}

export function validatePlanImport(data: ExportPlanData) {
  if (!data) {
    throw new Error('Invalid data');
  }

  if (!data.plan) {
    throw new Error('Plan not found');
  }
}
