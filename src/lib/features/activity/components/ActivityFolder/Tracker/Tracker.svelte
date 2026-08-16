<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { WeekDays } from '$lib/features/activity/types/week';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { trackActivity } from './utils/track-activity';

  type Props = {
    planType: PlanType;
    data: Activity[];
    onchange: (value: Activity[] | undefined) => void;
    startOfWeek: WeekDays;
    dateSortOrder: SortOrder;
  };

  const { planType, data: dataBase, onchange, startOfWeek, dateSortOrder }: Props = $props();
  const data = $derived(groupActivity(dataBase, planType, { startOfWeek, dateSortOrder }));

  function runTask() {
    const value = trackActivity(data, planType);

    onchange(value);
  }

  $effect(() => {
    // Run immediately
    runTask();

    // Then run every 5 seconds
    const interval = setInterval(runTask, 5000);

    // Cleanup when component is destroyed
    return () => {
      clearInterval(interval);
    };
  });
</script>
