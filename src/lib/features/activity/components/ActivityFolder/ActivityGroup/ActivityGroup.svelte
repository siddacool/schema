<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { AccordionItem } from '@flightlesslabs/dodo-ui-bits';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../../types';
  import { WeekDays } from '../../../types/week';
  import Header from './Header/Header.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import ActivityTree from './ActivityTree/ActivityTree.svelte';
  import type { ActivityTreeRefvalue } from '../../ActivityTree/ActivityTree.svelte';

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

  async function oncreateMod(value: ActivityCreateFormData, subActivity?: boolean) {
    if (!subActivity) {
      if (oncreate) {
        await oncreate(value);
      }

      return;
    }

    if (!treeRef) {
      return;
    }

    const now = Date.now();
    const newNode: Activity = {
      ...value,
      createdAt: now,
      updatedAt: now,
      planId: '',
    };

    let parentPath =
      value.path.lastIndexOf('.') === -1
        ? ''
        : value.path.substring(0, value.path.lastIndexOf('.'));

    if (!value.headerActivityId) {
      parentPath = '';
    }

    const result = treeRef.addNode(parentPath, { ...newNode });

    if (result.error) {
      console.error('Error:', result.error);
    }

    const { headerActivityId, ...restProps } = value;

    const path = `${headerActivityId}.${value.path}`;

    if (oncreate) {
      await oncreate(
        {
          ...restProps,
          path,
        },
        subActivity,
      );
    }
  }

  async function onupdateMod(value: Activity, subActivity?: boolean) {
    if (!subActivity) {
      if (onupdate) {
        await onupdate(value);
      }

      return;
    }

    if (!treeRef) {
      return;
    }

    const result = treeRef.updateNode(value.path, value);

    if (result.error) {
      console.error('Error:', result.error);
    }

    const { headerActivityId, ...restProps } = value;
    const path = headerActivityId ? `${headerActivityId}.${value.path}` : value.path;

    const updatedActivity: Activity = {
      ...restProps,
      path,
    };

    if (onupdate) {
      await onupdate(updatedActivity, subActivity);
    }
  }

  async function ondeleteMod(value: string, subActivity?: boolean) {
    if (!subActivity) {
      if (ondelete) {
        await ondelete(value);
      }

      return;
    }

    if (!treeRef) {
      return;
    }

    const targetData = data.activity.find((item) => item._id === value);

    if (!targetData) {
      return;
    }

    treeRef.removeNode(targetData.path);

    if (ondelete) {
      await ondelete(value, subActivity);
    }
  }
</script>

<AccordionItem class={classes.join(' ')} value={data._id}>
  {#snippet customHeaderContent()}
    <Card class="ActivityGroupHeaderCard" shadow={0} outline>
      <Header
        {planType}
        oncreate={oncreateMod}
        onupdate={onupdateMod}
        ondelete={ondeleteMod}
        {editMode}
        {data}
      />
    </Card>
  {/snippet}

  <ActivityTree
    bind:treeRef
    {planType}
    oncreate={oncreateMod}
    onupdate={onupdateMod}
    ondelete={ondeleteMod}
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
