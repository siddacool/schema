<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { planPageStore } from '$lib/features/plan/store/page.svelte';
  const activePlan = $derived(planPageStore.activePlan);

  $effect(() => {
    if (activePlan) {
      goto(resolve(`/plans/${activePlan}`), { replaceState: true });
    } else {
      goto(resolve('/plans'), { replaceState: true });
    }
  });
</script>
