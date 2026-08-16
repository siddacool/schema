<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { trackActivity } from './utils/track-activity';

  type Props = {
    planType: PlanType;
    data: Activity[];
    id: string;
    onchange: (value: string[] | undefined) => void;
  };

  const { planType, data, onchange, id }: Props = $props();

  function runTask() {
    console.log('Running task');

    const value = trackActivity(data, planType, id);

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
