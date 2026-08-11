import { getPlanById } from '../db';
import { toSafeFilename } from '$lib/utils/file-name/file-name';
import { createDate } from '$lib/utils/date-time/createDate';
import { downloadFile } from '$lib/utils/downloadFile';
import type { ExportPlanData } from '../types/export';
import { listActivity } from '$lib/features/activity/db';

export async function exportPlan(planId: string) {
  const plan = await getPlanById(planId);

  if (!plan) {
    throw new Error('Plan not found');
  }

  const activity = await listActivity(planId);

  const data: ExportPlanData = {
    plan,
    activity,
  };

  const now = createDate();
  const nameFormmated = toSafeFilename(plan.name, 20);
  const filename = `${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.schema`;

  downloadFile(filename, JSON.stringify(data, null, 2), 'application/vnd.schema');
}
