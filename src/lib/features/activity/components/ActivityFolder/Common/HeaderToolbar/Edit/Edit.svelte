<script lang="ts">
  import type { Activity, ActivityGroup } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import EditActivityWeekForm from './Week/EditActivityWeekForm.svelte';
  import EditActivityCalendarForm from './Calendar/EditActivityCalendarForm.svelte';
  import EditActivitySequenceForm from './Sequence/EditActivitySequenceForm.svelte';

  type Props = {
    planType: PlanType;
    class?: string;
    data: Activity;
    onupdate?: (data: Activity) => Promise<void>;
    groups: ActivityGroup[];
  };

  const { class: className = '', data, onupdate, planType, groups }: Props = $props();

  const classes = $derived(['Edit', 'ToolbarAdvancedButton', className].filter(Boolean));

  let open = $state(false);

  const isAvailableDays = $derived(groups.length < 7);
</script>

<div class={classes.join(' ')}>
  <Button
    aria-label="Edit details"
    class="EditButton"
    roundness={1}
    title="Edit details"
    compact
    color="primary"
    onclick={() => (open = true)}
    variant="text"
    size="small"
    id={`EditButton-${data._id}`}
  >
    <Icon icon="material-symbols:edit-outline" />
  </Button>
</div>

{#if planType === PlanType.SEQUENCE}
  <EditActivitySequenceForm {onupdate} {data} bind:open mode="update" />
{:else if planType === PlanType.WEEK && isAvailableDays}
  <EditActivityWeekForm {onupdate} {data} bind:open mode="update" {groups} />
{:else if planType === PlanType.CALENDAR}
  <EditActivityCalendarForm {onupdate} {data} bind:open mode="update" {groups} />
{/if}

<style lang="scss">
  .Edit {
    position: absolute;
    z-index: -200;
    :global(.dodo-ui-Button.size--small.EditButton) {
      font-size: 1.3rem;
    }
  }
</style>
