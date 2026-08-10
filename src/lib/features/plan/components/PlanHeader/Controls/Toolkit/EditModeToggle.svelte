<script>
  import { page } from '$app/state';
  import { updatePlanFields } from '$lib/features/plan/logic/crud.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const planId = page.params.planId || '';

  const editMode = $derived(planDetailStore.plan?.editMode === false ? false : true);

  function toggleEditMode() {
    if (!planId) {
      return;
    }

    updatePlanFields(planId, {
      editMode: !editMode,
    });
  }
</script>

<div class="EditModeToggle" class:editMode>
  <Button
    aria-label={editMode ? 'Edit mode' : 'Read mode'}
    class="EditModeToggleButton"
    roundness={1}
    title={editMode ? 'Edit mode' : 'Read mode'}
    compact
    color={editMode ? 'safe' : 'warning'}
    onclick={toggleEditMode}
    variant="text"
    size="small"
  >
    {#if editMode}
      <Icon icon="ri:edit-line" />
    {:else}
      <Icon icon="ant-design:read-outlined" />
    {/if}
  </Button>
</div>

<style lang="scss">
  .EditModeToggle {
    :global(.dodo-ui-Button.size--small.EditModeToggleButton) {
      font-size: 1.5rem;
    }

    &.editMode {
      :global(.dodo-ui-Button.size--small.EditModeToggleButton) {
        font-size: 1.2rem;
      }
    }
  }
</style>
