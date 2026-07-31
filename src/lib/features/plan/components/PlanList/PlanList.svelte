<script lang="ts">
  import type { Plan } from '$lib/features/plan/types';
  import PlanCard from './PlanCard/PlanCard.svelte';

  type Props = {
    plans: Plan[];
  };

  let { plans }: Props = $props();
</script>

<div class="PlanList">
  {#each plans as plan (plan._id)}
    <PlanCard {plan} />
  {/each}
</div>

<style lang="scss">
</style>
