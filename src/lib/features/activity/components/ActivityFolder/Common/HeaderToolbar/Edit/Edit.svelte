<script lang="ts">
  import EditActivityForm from '$lib/features/activity/components/ActivityTree/EditActivityForm/EditActivityForm.svelte';
  import type { Activity, ActivityGroup } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import EditActivityWeekForm from './Week/EditActivityWeekForm.svelte';

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

{#snippet EditButton()}
  <div class={classes.join(' ')}>
    <Button
      aria-label="Edit details"
      class="EditButton"
      roundness={1}
      title="Edit details"
      compact
      color="neutral"
      size="small"
      onclick={() => (open = true)}
      variant="text"
    >
      <Icon icon="material-symbols:edit-outline" />
    </Button>
  </div>
{/snippet}

{#if planType === PlanType.WEEK && isAvailableDays}
  {@render EditButton()}
  <EditActivityWeekForm {onupdate} {data} bind:open mode="update" {groups} />
{:else if planType === PlanType.SEQUENCE}
  {@render EditButton()}
  <EditActivityForm {onupdate} {data} bind:open mode="update" />
{/if}

<style lang="scss">
  .Edit {
    :global(.dodo-ui-Button.size--small.EditButton) {
      font-size: 1.3rem;
    }
  }
</style>
