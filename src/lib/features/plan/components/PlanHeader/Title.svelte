<script lang="ts">
  import { planDetailStore } from '../../store/detail.svelte';
  import PlanTypeIcon from '../PlanTypeIcon.svelte';

  const plan = $derived(planDetailStore.plan);
</script>

{#if plan}
  <div class="Title">
    <div class="planTypeIcon">
      <PlanTypeIcon value={plan.type} />
    </div>
    {plan.name}
  </div>
{/if}

<style lang="scss">
  .Title {
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  .planTypeIcon {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    margin-right: var(--dodo-ui-space);

    :global(.PlanTypeIcon.value--SEQUENCE) {
      font-size: 1.4rem;
    }
  }
</style>
