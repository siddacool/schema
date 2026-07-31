<script lang="ts">
  import type { Plan } from '$lib/features/plan/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import { resolve } from '$app/paths';

  type Props = {
    plan: Plan;
  };

  let { plan }: Props = $props();
</script>

<Card class="PlanListPlanCard" shadow={0} outline active color="neutral">
  <a href={resolve(`/plans/${plan._id}`)}>
    <h3>{plan.name}</h3>
  </a>
</Card>

<style lang="scss">
  :global(.PlanListPlanCard) {
    margin-bottom: var(--dodo-ui-space);
  }

  a {
    padding: calc(var(--dodo-ui-space) * 2);
    margin: 0;
    display: flex;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }

  h3 {
    margin: 0;
    font-weight: 500;
    font-size: 1.2rem;
  }
</style>
