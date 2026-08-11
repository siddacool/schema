<script lang="ts">
  import PlanList from '$lib/features/plan/components/PlanList/PlanList.svelte';
  import PlansListPageInstructions from '$lib/features/plan/components/PlansListPageInstructions/PlansListPageInstructions.svelte';
  import { clearActivePlan } from '$lib/features/plan/logic/page.svelte';
  import { planListStore } from '$lib/features/plan/store/list.svelte';

  let loading = $derived(true);
  const plans = $derived(planListStore.plans);

  async function load() {
    await planListStore.load();
    loading = false;
  }

  $effect(() => {
    load();

    clearActivePlan();
  });
</script>

{#if !loading && plans.length}
  <PlanList {plans} />
{:else}
  <PlansListPageInstructions />
{/if}

<style lang="scss">
</style>
