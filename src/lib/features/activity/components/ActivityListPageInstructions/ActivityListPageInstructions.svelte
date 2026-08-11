<script lang="ts">
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import Sequence from './Sequence.svelte';
  import Week from './Week.svelte';
  import Calendar from './Calendar.svelte';

  const planType = $derived(planDetailStore.plan?.type);
</script>

<div class="ActivityListPageInstructions">
  {#if planType === PlanType.SEQUENCE}
    <Sequence />
  {:else if planType === PlanType.WEEK}
    <Week />
  {:else if planType === PlanType.CALENDAR}
    <Calendar />
  {/if}
</div>

<style lang="scss">
  .ActivityListPageInstructions {
    padding-top: var(--dodo-ui-space);

    :global(.title) {
      display: flex;
      align-items: center;
      justify-self: center;
      font-size: 2.4rem;
      font-weight: 500;
      font-family: 'Crimson Pro', serif;
      font-style: italic;

      @media (min-width: 600px) {
        font-size: 2.7rem;
      }
    }

    :global(.siteDescription) {
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--dodo-color-neutral-600);

      @media (min-width: 600px) {
        font-size: 1.5rem;
      }
    }

    :global(.siteFeatures) {
      font-size: 1.2rem;
      font-weight: 400;
      font-family: 'Crimson Pro', serif;
      color: var(--dodo-color-neutral-600);

      @media (min-width: 600px) {
        font-size: 1.3rem;
      }
    }

    :global(p .addButton) {
      font-size: 1.3rem;
    }

    :global(.PlanTypeIcon) {
      font-size: 1.8rem;
      margin-right: var(--dodo-ui-space);
    }
  }
</style>
