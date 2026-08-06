<script lang="ts">
  import type { ActivityGroup, Activity } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import EditActivityFormSequence from './Sequence/EditActivityForm/EditActivityForm.svelte';

  type Props = {
    planType: PlanType;
    class?: string;
    data: ActivityGroup;
    onupdate?: (data: Activity) => Promise<void>;
  };

  const { class: className = '', data, onupdate, planType }: Props = $props();

  const classes = $derived(['Edit', className].filter(Boolean));

  let open = $state(false);
</script>

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

{#if planType === PlanType.SEQUENCE}
  <EditActivityFormSequence {onupdate} {data} bind:open />
{:else}
  yo
{/if}

<style lang="scss">
  .Edit {
    :global(.dodo-ui-Button.size--small.EditButton) {
      font-size: 1.3rem;
    }
  }
</style>
