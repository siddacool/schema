<script lang="ts">
  import Instructions from '$lib/components/Instructions/Instructions.svelte';
  import PlanTypeIcon from '$lib/features/plan/components/PlanTypeIcon.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import Icon from '@iconify/svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="ActivityListPageInstructionsCalendar">
    <Instructions>
      <h1 class="title"><PlanTypeIcon value={plan.type} /> {plan.name}</h1>
      <h3 class="siteFeatures">add travel itineraries, date wise plans etc.</h3>

      <p>
        Click on <span class="addButton"><Icon icon="material-symbols:add-rounded" /></span> button
        to
        <b>Add date</b>.
      </p>
    </Instructions>
  </div>
{/if}
