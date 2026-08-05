<script lang="ts">
  import { Group } from '@flightlesslabs/dodo-ui';
  import { WeekDays } from '../../types/week';
  import { getDaysOfWeek } from '../../utils/get-days-of-week';
  import DayButton from './DayButton.svelte';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';

  type Props = {
    class?: string;
    excludeList?: WeekDays[];
    onclick?: (value: WeekDays) => void;
    startFrom?: WeekDays;
    disabled?: boolean;
  };

  const {
    class: className = '',
    onclick,
    excludeList = [],
    startFrom = DEFAULT_START_OF_WEEK,
    disabled,
  }: Props = $props();

  const classes = $derived(['DayPicker', className].filter(Boolean));

  const daysListAll = $derived(getDaysOfWeek(startFrom));
  const daysList = $derived(daysListAll.filter((item) => !excludeList.includes(item)));
</script>

<Group class={classes.join(' ')} gap={3} roundness={2}>
  {#each daysList as day (day)}
    <DayButton value={day} {onclick} {disabled} />
  {/each}
</Group>

<style>
  :global(.DayPicker) {
    padding-left: 0;
  }
</style>
