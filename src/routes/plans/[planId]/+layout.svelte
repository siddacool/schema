<script lang="ts">
  import { page } from '$app/state';
  import Box from '$lib/components/Box/Box.svelte';
  import PlanHeader from '$lib/features/plan/components/PlanHeader/PlanHeader.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';

  let { children } = $props();

  let loading = $derived(true);
  const planId = page.params.planId || '';
  const plan = $derived(planDetailStore.plan);

  async function load() {
    await planDetailStore.load(planId);
    loading = false;
  }

  $effect(() => {
    load();
  });
</script>

{#if plan && !loading}
  <PlanHeader />

  <Box>
    <div class="container">
      {@render children()}
    </div>
  </Box>
{/if}

<style lang="scss">
  .container {
    padding: calc(var(--dodo-ui-space) * 3) 0;
    height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
