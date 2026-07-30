import { createDate } from '$lib/utils/date-time/createDate';
import { downloadFile } from '$lib/utils/downloadFile';
import { toSafeFilename } from '$lib/utils/file-name/file-name';
import { planDetailStore } from '../../store/detail.svelte';
import type { Plan } from '../../types';
import type { ExportPlanData } from '../../types/export';

export function exportPlan() {
  const plan = planDetailStore.plan as Plan;

  const data: ExportPlanData = {
    plan,
  };

  const now = createDate();

  const nameFormmated = toSafeFilename(plan.name, 20);
  const filename = `${nameFormmated}.${now.format('YYYY-MM-DD_HH-mm-ss')}.schema`;

  downloadFile(filename, JSON.stringify(data, null, 2), 'application/vnd.schema');
}
