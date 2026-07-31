<script lang="ts">
  import { page } from '$app/state';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';

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
  <div>yo</div>
{/if}

<style lang="scss">
</style>
