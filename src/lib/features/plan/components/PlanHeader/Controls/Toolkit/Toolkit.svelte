<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import EditModeToggle from './EditModeToggle.svelte';
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import { updatePlanFields } from '$lib/features/plan/logic/crud.svelte';
  import { page } from '$app/state';

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
      <EditModeToggle />
    </Card>
  </div>
{/if}

<style lang="scss">
  .Toolkit {
    margin-right: var(--dodo-ui-space);

    :global(.dodo-ui-Button) {
      margin: 0 6px;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    :global(.ToolkitCard) {
      padding: calc(var(--dodo-ui-space) * 0.5) var(--dodo-ui-space);
      background-color: var(--dodo-color-neutral-200);
    }
  }
</style>
