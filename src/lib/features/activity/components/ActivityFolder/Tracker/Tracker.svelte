<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityMiniDbStore } from '../../store/activity-mini-db.svelte';

  type Props = {
    planType: PlanType;
  };

  const { planType }: Props = $props();

  let miniDatabase = $derived<Activity[]>(activityMiniDbStore.activity);

  function runTask(activity: Activity[]) {
    console.log('Running task');
    console.log('Latest miniDatabase:', activity);
  }

  $effect(() => {
    // Run immediately
    runTask(miniDatabase);

    // Then run every 5 seconds
    const interval = setInterval(runTask, 5000);

    // Cleanup when component is destroyed
    return () => {
      clearInterval(interval);
    };
  });
</script>
