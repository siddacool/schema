<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { AccordionItem } from '@flightlesslabs/dodo-ui-bits';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../../types';
  import { WeekDays } from '../../../types/week';
  import Header from './Header/Header.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import ActivityTree from './ActivityTree/ActivityTree.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
  }: Props = $props();

  const classes = $derived(['ActivityGroup', className].filter(Boolean));
</script>

<AccordionItem class={classes.join(' ')} value={data._id}>
  {#snippet customHeaderContent()}
    <Card class="ActivityGroupHeaderCard" shadow={0}>
      <Header {planType} {oncreate} {onupdate} {ondelete} {editMode} {data} />
    </Card>
  {/snippet}

  <ActivityTree
    {planType}
    {oncreate}
    {onupdate}
    {ondelete}
    {editMode}
    group={data}
    {startOfWeek}
    {maxLevels}
  />
</AccordionItem>

<style>
  :global(.ActivityGroup.dodo-ui-AccordionItem) {
    margin-bottom: calc(var(--dodo-ui-space) * 2);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem .ActivityGroupHeaderCard) {
    display: flex;
    align-items: center;
    padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space) * 0.8);
    width: 100%;

    &:hover {
      background-color: var(--dodo-color-neutral-100);
    }
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed']) {
    padding-bottom: calc(var(--dodo-ui-space) * 1);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .ActivityGroupHeaderCard) {
    border-color: transparent;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .ToolbarAdvancedButton) {
    display: none;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .ActivityGroupHeaderCard) {
    background-color: var(--dodo-color-neutral-200);
    font-weight: 600;
  }
</style>
