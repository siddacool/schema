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
  import ActivityTree, {
    type ActivityTreeRefvalue,
  } from '$lib/features/activity/components/ActivityTree/ActivityTree.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
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
    <Card class="ActivityGroupHeaderCard" shadow={0} outline>
      <Header {planType} oncreate={oncreateMain} {onupdate} {ondelete} {editMode} {data} />
    </Card>
  {/snippet}

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
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem .ActivityGroupHeaderCard) {
    display: flex;
    align-items: center;
    padding: calc(var(--dodo-ui-space)) calc(var(--dodo-ui-space) * 0.8);
    width: 100%;
    transition:
      background-color 100ms,
      color 100ms;

    &:hover {
      background-color: var(--dodo-color-neutral-100);
    }
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed']) {
    padding-bottom: calc(var(--dodo-ui-space) * 1);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] [data-accordion-content]) {
    padding-top: var(--dodo-ui-space);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .ActivityGroupHeaderCard) {
    border-color: transparent;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .Toolbar) {
    display: none;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .ActivityGroupHeaderCard) {
    font-weight: 600;
  }
</style>
