<script lang="ts">
  import type { ActivityGroup } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import HeaderDescription from '../../../ActivityFolder/Common/HeaderDescription/HeaderDescription.svelte';

  import { AccordionTrigger } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
  };

  const { class: className = '', planType, data }: Props = $props();

  const classes = $derived(['ActivityGroupHeaderTrigger', className].filter(Boolean));
</script>

<AccordionTrigger class={classes.join(' ')}>
  <spn class="TriggerIcon">
    <Icon icon="weui:arrow-filled" />
  </spn>

  <HeaderDescription {data} {planType} />
</AccordionTrigger>

<style lang="scss">
  :global(.ActivityGroupHeaderTrigger) {
    display: flex;
    width: 100%;
    align-items: center;
    padding: var(--dodo-ui-space);
    display: flex;
    align-items: center;
    flex: 1;
  }

  :global(.ActivityGroupHeaderTrigger .HeaderDescription) {
    margin: 0;
    margin-left: var(--dodo-ui-space);
    font-size: 1rem;
    overflow: hidden;

    @media (min-width: 600px) {
      font-size: 1.1rem;
    }
  }

  :global(.ActivityGroupHeaderTrigger .TriggerIcon) {
    font-size: 1.5rem;
    display: inline-flex;
    align-items: center;
  }

  :global(.ActivityGroupHeaderTrigger[aria-expanded='true'] .TriggerIcon) {
    rotate: 90deg;
  }
</style>
