<script lang="ts">
  import type { ActivityCreateFormData, ActivityGroup } from '$lib/features/activity/types';
  import type { WeekDays } from '$lib/features/activity/types/week';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import EditActivityWeekForm from '../Common/HeaderToolbar/Edit/Week/EditActivityWeekForm.svelte';
  import EditActivityCalendarForm from '../Common/HeaderToolbar/Edit/Calendar/EditActivityCalendarForm.svelte';
  import EditActivitySequenceForm from '../Common/HeaderToolbar/Edit/Sequence/EditActivitySequenceForm.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup[];
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    editMode: boolean;
    startOfWeek: WeekDays;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    editMode,
    startOfWeek,
  }: Props = $props();

  const classes = $derived(['ActivityFolderMainCreate', className].filter(Boolean));

  let open = $state(false);
  const isAvailableDays = $derived(data.length < 7);
</script>

{#if planType === PlanType.SEQUENCE}
  {#if editMode}
    <div class={classes.join(' ')}>
      <Button id="ActivityFolderMainCreateButton" onclick={() => (open = true)}>Add activity</Button
      >
    </div>
  {/if}
  <EditActivitySequenceForm {oncreate} bind:open data={undefined} mode="create" />
{:else if planType === PlanType.WEEK && isAvailableDays}
  {#if editMode}
    <div class={classes.join(' ')}>
      <Button id="ActivityFolderMainCreateButton" onclick={() => (open = true)}>Add day</Button>
    </div>
  {/if}
  <EditActivityWeekForm {oncreate} bind:open data={undefined} mode="create" groups={data} />
{:else if planType === PlanType.CALENDAR}
  {#if editMode}
    <div class={classes.join(' ')}>
      <Button id="ActivityFolderMainCreateButton" onclick={() => (open = true)}>Add date</Button>
    </div>
  {/if}
  <EditActivityCalendarForm {oncreate} bind:open data={undefined} mode="create" groups={data} />
{/if}

<style lang="scss">
  .ActivityFolderMainCreate {
    margin-bottom: calc(var(--dodo-ui-space) * 2);
  }
</style>
