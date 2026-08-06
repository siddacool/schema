<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import Create from './Create/Create.svelte';

  type OnChangeFn<T> = (value: T) => void;

  type Props = {
    planType: PlanType;
    data: Activity[];
    oncreateMain: (data: ActivityCreateFormData) => Promise<void>;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
    dateSortOrder: SortOrder;
  };

  const {
    planType,
    data: dataBase,
    oncreateMain,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
    dateSortOrder,
  }: Props = $props();

  const data = $derived(groupActivity(dataBase, planType, { startOfWeek, dateSortOrder }));
  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(newArray: string[]) {
    const added = newArray.filter((item) => !accordianExpandedValues.includes(item));
    const removed = accordianExpandedValues.filter((item) => !newArray.includes(item));

    if (added.length) {
      const targetId = added[0];
      const target = dataBase.find((item) => item._id === targetId);

      if (target && onupdate) {
        onupdate({
          ...target,
          expanded: true,
        });
      }
    } else if (removed.length) {
      const targetId = removed[0];
      const target = dataBase.find((item) => item._id === targetId);

      if (target && onupdate) {
        onupdate({
          ...target,
          expanded: false,
        });
      }
    }

    accordianExpandedValues = newArray;
  }
</script>

<Create oncreate={oncreateMain} {data} {editMode} {startOfWeek} {planType} />

<Accordion
  type="multiple"
  value={accordianExpandedValues}
  onValueChange={toggleAccordianExpanded as OnChangeFn<string[]>}
>
  {#each data as activityGroup (activityGroup._id)}
    <ActivityGroupContainer
      data={activityGroup}
      {planType}
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      {startOfWeek}
    />
  {/each}
</Accordion>
