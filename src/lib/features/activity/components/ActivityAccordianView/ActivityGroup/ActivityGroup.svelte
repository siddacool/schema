<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { WeekDays } from '$lib/features/activity/types/week';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Card } from '@flightlesslabs/dodo-ui';
  import { AccordionItem } from '@flightlesslabs/dodo-ui-bits';
  import Header from './Header/Header.svelte';
  import { activityTreeAdd } from '$lib/features/activity/components/ActivityTree/utils/crud/add';
  import ActivityTree from '$lib/features/activity/components/ActivityTree/ActivityTree.svelte';
  import type { ActivityTreeRefvalue } from '$lib/features/activity/components/ActivityTree/types';
  import VerticalLine from './VerticalLine.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    groups: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
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
    groups,
  }: Props = $props();

  const classes = $derived(['ActivityGroup', className].filter(Boolean));
  let treeRef = $derived<ActivityTreeRefvalue | undefined>(undefined);

  async function oncreateMain(value: ActivityCreateFormData, subActivity?: boolean) {
    if (!subActivity) {
      if (oncreate) {
        await oncreate(value);
      }

      return;
    }

    const formData = await activityTreeAdd(treeRef, value, data);

    if (oncreate && formData) {
      await oncreate(formData, subActivity);
    }
  }
</script>

<AccordionItem class={classes.join(' ')} value={data._id}>
  {#snippet customHeaderContent()}
    <Card class="ActivityGroupHeaderCard" shadow={0}>
      <Header {planType} oncreate={oncreateMain} {onupdate} {ondelete} {editMode} {data} {groups} />
    </Card>
  {/snippet}
  <VerticalLine {data} />
  <ActivityTree
    bind:treeRef
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
    padding-left: var(--dodo-ui-space);
    padding-right: var(--dodo-ui-space);
    position: relative;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem .ActivityGroupHeaderCard) {
    display: flex;
    align-items: center;
    padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space) * 0.8);
    width: 100%;
    transition:
      background-color 100ms,
      color 100ms;
    min-height: 55px;

    &:hover {
      background-color: var(--dodo-color-neutral-200);
    }
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed']) {
    padding-bottom: calc(var(--dodo-ui-space) * 2);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] [data-accordion-content]) {
    padding-top: 0;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .ActivityGroupHeaderCard) {
    border-color: var(--dodo-color-neutral-500);
    background-color: var(--dodo-color-neutral-100);

    &:hover {
      background-color: var(--dodo-color-neutral-200);
    }
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .Header) {
    font-variation-settings: 'wdth' 120;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .Toolbar) {
    display: none;
  }
</style>
