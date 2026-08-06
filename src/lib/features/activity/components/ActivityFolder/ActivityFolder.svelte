<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { Activity, ActivityCreateFormData, ActivityGroup } from '../../types';
  import { WeekDays } from '../../types/week';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import ActivityGroupContainer from './ActivityGroup/ActivityGroup.svelte';
  import { Accordion } from '@flightlesslabs/dodo-ui-bits';
  type OnChangeFn<T> = (value: T) => void;

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels?: number;
    editMode?: boolean;
    startOfWeek?: WeekDays;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels = 5,
    editMode = false,
    startOfWeek = DEFAULT_START_OF_WEEK,
  }: Props = $props();

  $effect(() => {
    console.log('debug:', 'data', data);
  });

  const classes = $derived(['ActivityFolder', className].filter(Boolean));
  let accordianExpandedValues = $derived(
    data.filter((item) => item.expanded).map((item) => item._id),
  );

  function toggleAccordianExpanded(value: []) {
    accordianExpandedValues = value;

    console.log('debug:', value);
  }
</script>

<div class={classes.join(' ')}>
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
