<script lang="ts">
  import Instructions from '$lib/components/Instructions/Instructions.svelte';
  import PlanTypeIcon from '$lib/features/plan/components/PlanTypeIcon.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import Icon from '@iconify/svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="ActivityListPageInstructionsSequence">
    <Instructions>
      <h1 class="title"><PlanTypeIcon value={plan.type} /> {plan.name}</h1>
      <h3 class="siteFeatures">add step wise activity. Step 1, Step 2..</h3>

      <p>
        Click on <span class="addButton"><Icon icon="material-symbols:add-rounded" /></span> button to
        add an activity.
      </p>
    </Instructions>
  </div>
{/if}

<style lang="scss">
  .ActivityListPageInstructionsSequence {
    :global(.PlanTypeIcon) {
      font-size: 2rem;
      margin-right: var(--dodo-ui-space);
    }
  }
</style>
