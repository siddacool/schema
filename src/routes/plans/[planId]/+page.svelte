<script lang="ts">
  import { page } from '$app/state';
  import ActivityTree from '$lib/features/activity/components/ActivityTree/ActivityTree.svelte';
  import { saveActivity } from '$lib/features/activity/logic/crud.svelte';
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import type { ActivityCreateData, ActivityCreateFormData } from '$lib/features/activity/types';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';

  let loading = $derived(true);
  const planId = page.params.planId || '';
  const plan = $derived(planDetailStore.plan);
  const activityList = $derived(activityListStore.activity);

  async function load() {
    await planDetailStore.load(planId);
    await activityListStore.load(planId);
    loading = false;
  }

  async function oncreate(data: ActivityCreateFormData) {
    const dataFormatted: ActivityCreateData = {
      ...data,
      planId,
    };

    await saveActivity(dataFormatted);
  }

  $effect(() => {
    load();
  });
</script>

{#if plan && !loading}
  <div>
    <ActivityTree planType={plan.type} data={activityList} {oncreate} />
  </div>
{/if}

<style lang="scss">
</style>
