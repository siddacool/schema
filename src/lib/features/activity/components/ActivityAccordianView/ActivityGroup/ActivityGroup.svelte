<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { AccordionItem } from '@flightlesslabs/dodo-ui-bits';
  import Header from './Header/Header.svelte';
  import { activityTreeAdd } from '$lib/features/activity/components/ActivityTree/utils/crud/add';
  import ActivityTree from '$lib/features/activity/components/ActivityTree/ActivityTree.svelte';
  import type { ActivityTreeRefvalue } from '$lib/features/activity/components/ActivityTree/types';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    groups: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    onbulkupdate?: (data: Activity[], subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    trackedIds: string[] | undefined;
    track: boolean;
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
    groups,
    onbulkupdate,
    trackedIds,
    track,
  }: Props = $props();

  const theme = $derived(useThemeStore.theme);

  const classes = $derived(
    ['ActivityGroup', `ActivityGroup-${data._id}`, `theme--${theme}`, className].filter(Boolean),
  );
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
    <Header
      {planType}
      oncreate={oncreateMain}
      {onupdate}
      {ondelete}
      {editMode}
      {data}
      {groups}
      {track}
      {trackedIds}
    />
  {/snippet}
  <ActivityTree
    bind:treeRef
    {oncreate}
    {onupdate}
    {ondelete}
    {editMode}
    group={data}
    {maxLevels}
    {onbulkupdate}
    {track}
    {trackedIds}
  />
</AccordionItem>

<style>
  :global(.ActivityGroup.dodo-ui-AccordionItem) {
    margin-bottom: calc(var(--dodo-ui-space) * 1);
    padding-left: var(--dodo-ui-space);
    padding-right: var(--dodo-ui-space);
    position: relative;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem .AccordionItemHeader) {
    position: relative;
    z-index: 1;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed']) {
    padding-bottom: calc(var(--dodo-ui-space) * 1);
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] [data-accordion-content]) {
    padding-top: 0;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='closed'] .Toolbar) {
    display: none;
  }

  :global(.ActivityGroup.dodo-ui-AccordionItem[data-state='open'] .ActivityGroupHeaderCard) {
    background-color: var(--dodo-color-neutral-200);

    &:hover {
      background-color: var(--dodo-color-primary-200);
    }
  }

  :global(
    .ActivityGroup.theme--dark.dodo-ui-AccordionItem[data-state='open'] .ActivityGroupHeaderCard
  ) {
    &:hover {
      background-color: var(--dodo-color-primary-100);
    }
  }
</style>
