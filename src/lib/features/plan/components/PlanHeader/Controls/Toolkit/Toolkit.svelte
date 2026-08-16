<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import EditModeToggle from './EditModeToggle.svelte';
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import { updatePlanFields } from '$lib/features/plan/logic/crud.svelte';
  import { page } from '$app/state';
  import TrackToggle from './TrackToggle.svelte';

  const planId = page.params.planId || '';
  const isShow = $derived(activityListStore.activityBackup.length ? true : false);

  $effect(() => {
    if (!planId) {
      return;
    }

    if (!isShow) {
      updatePlanFields(planId, { editMode: true });
    }
  });
</script>

{#if isShow}
  <div class="Toolkit">
    <Card shadow={0} class="ToolkitCard">
      <TrackToggle />
      <EditModeToggle />
    </Card>
  </div>
{/if}

<style lang="scss">
  .Toolkit {
    margin-right: var(--dodo-ui-space);

    :global(.ToolkitCard) {
      padding: calc(var(--dodo-ui-space) * 0.4);
      background-color: var(--dodo-color-neutral-200);
      display: flex;
    }

    :global(.ToolkitCard section) {
      margin: 0 3px;
    }

    :global(.ToolkitCard .dodo-ui-Button) {
      margin: 0;
    }
  }
</style>
