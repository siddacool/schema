<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import Create from './Create/Create.svelte';
  import { nanoid } from 'nanoid';
  type OnChangeFn<T> = (value: T) => void;

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels?: number;
    editMode?: boolean;
    startOfWeek?: WeekDays;
    dateSortOrder?: SortOrder;
  };

  const {
    class: className = '',
    planType,
    data: dataRaw,
    oncreate,
    onupdate,
    ondelete,
    maxLevels = 5,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
    dateSortOrder = DEFAULT_DATE_SORT_ORDER,
  }: Props = $props();

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let dataBase = $state<Activity[]>([]);
  const data = $derived(groupActivity(dataBase, planType, { startOfWeek, dateSortOrder }));
  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(value: []) {
    accordianExpandedValues = value;
  }

  async function oncreateMain(data: ActivityCreateFormData) {
    const now = Date.now();

    const newHeader: ActivityGroup = {
      ...data,
      _id: data.path,
      createdAt: now,
      updatedAt: now,
      planId: 'plan-1',
      activity: [],
    };

    dataBase = JSON.parse(JSON.stringify([...dataBase, newHeader]));

    if (oncreate) {
      oncreate(data);
    }
  }

  $effect(() => {
    if (dataRaw) {
      dataBase = dataRaw;
    }
  });

  $effect(() => {
    console.log('debug:', 'data', data);
  });
</script>

<div class={classes.join(' ')}>
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
</div>
