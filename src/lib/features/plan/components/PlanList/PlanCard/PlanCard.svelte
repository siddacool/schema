<script lang="ts">
  import type { Plan } from '$lib/features/plan/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import { resolve } from '$app/paths';
  import { planTypeOptions } from '$lib/features/plan/config';
  import { PlanType } from '$lib/features/plan/types/plan-type';

  type Props = {
    plan: Plan;
  };

  let { plan }: Props = $props();
  const planType = $derived(plan.type || PlanType.SEQUENCE);
  const planTypeLabel = $derived(
    planTypeOptions.find((item) => item.value === planType)?.label || planType,
  );
</script>

<Card class="PlanListPlanCard" shadow={0} outline active color="neutral">
  <a href={resolve(`/plans/${plan._id}`)}>
    <h3>{plan.name}</h3>
    <div class="planType">{planTypeLabel}</div>
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
    flex-direction: column;
  }

  h3 {
    margin: 0;
    font-weight: 500;
    font-size: 1.2rem;
    margin-bottom: var(--dodo-ui-space);
  }

  .planType {
    font-size: 1rem;
    font-weight: 300;
    opacity: 0.9;
    color: var(--dodo-color-primary-800);
  }
</style>
