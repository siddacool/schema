<script lang="ts">
  import Instructions from '$lib/components/Instructions/Instructions.svelte';
  import PlanTypeIcon from '$lib/features/plan/components/PlanTypeIcon.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import Icon from '@iconify/svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="ActivityListPageInstructionsWeek">
    <Instructions>
      <h1 class="title"><PlanTypeIcon value={plan.type} /> {plan.name}</h1>

      <p>
        Click on <span class="addButton"><Icon icon="material-symbols:add-rounded" /></span> button
        to
        <b>Add day</b>.
      </p>
    </Instructions>
  </div>
{/if}
