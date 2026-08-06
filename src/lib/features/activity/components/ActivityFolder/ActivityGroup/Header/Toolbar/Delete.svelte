<script lang="ts">
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ActivityGroup } from '$lib/features/activity/types';

  type Props = {
    ondelete?: (data: string) => Promise<void>;
    data: ActivityGroup;
  };

  let { ondelete, data }: Props = $props();

  let loading = $state(false);

  async function handleDelete() {
    try {
      loading = true;

      if (ondelete) {
        ondelete(data._id);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete activity',
        description: message,
        color: 'danger',
      });
    } finally {
      loading = false;
    }
  }

  function deleteConfirmation(e: MouseEvent) {
    e.stopPropagation();

    modals.add('confirm', {
      title: 'Delete activity',
      description: 'Are you sure you want to delete this activity?',
      onaccept: handleDelete,
    });
  }
</script>

<div class="Delete">
  <Button
    aria-label="Delete"
    class="DeleteButton"
    roundness={1}
    title="Delete"
    compact
    color="danger"
    size="small"
    onclick={deleteConfirmation}
    variant="text"
    disabled={loading}
  >
    <Icon icon="material-symbols:delete-outline-rounded" />
  </Button>
</div>

<style lang="scss">
  .Delete {
    :global(.dodo-ui-Button.size--small.DeleteButton) {
      font-size: 1.3rem;
    }
  }
</style>
