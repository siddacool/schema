<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import type { SortOrder } from '$lib/features/shared/types/sort-order';
  import { DEFAULT_DATE_SORT_ORDER } from '../../const/calendar';
  import Create from './Create/Create.svelte';
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
  const data = $derived(groupActivity(dataRaw, planType, { startOfWeek, dateSortOrder }));
  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(value: []) {
    accordianExpandedValues = value;

    console.log('debug:', value);
  }
</script>

<div class={classes.join(' ')}>
  <Create {oncreate} {data} {editMode} {startOfWeek} {planType} />
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
