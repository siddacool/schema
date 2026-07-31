<script lang="ts">
  import PlanList from '$lib/features/plan/components/PlanList/PlanList.svelte';
  import { planListStore } from '$lib/features/plan/store/list.svelte';

  let loading = $derived(true);
  const plans = $derived(planListStore.plans);

  async function load() {
    await planListStore.load();
    loading = false;
  }

  $effect(() => {
    load();
  });
</script>

{#if plans.length && !loading}
  <PlanList {plans} />
{/if}

<div></div>

<style lang="scss">
</style>
