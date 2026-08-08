<script lang="ts">
  import EditActivityForm from '$lib/features/activity/components/ActivityTree/EditActivityForm/EditActivityForm.svelte';
  import type { Activity } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    planType: PlanType;
    class?: string;
    data: Activity;
    onupdate?: (data: Activity) => Promise<void>;
  };

  const { class: className = '', data, onupdate, planType }: Props = $props();

  const classes = $derived(['Edit', 'ToolbarAdvancedButton', className].filter(Boolean));

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
  <EditActivityForm {onupdate} {data} bind:open mode="update" />
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
