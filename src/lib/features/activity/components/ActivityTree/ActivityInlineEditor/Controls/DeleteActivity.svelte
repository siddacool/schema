<script lang="ts">
  import { modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { Button } from '@flightlesslabs/dodo-ui';
  import type { ActivityNodeValue, ActivityTreeOnDelete } from '../../ActivityTree.svelte';
  import type { Activity } from '$lib/features/activity/types';

  type Props = {
    ondelete?: ActivityTreeOnDelete;
    value: ActivityNodeValue;
    data: Activity[];
  };

  let { ondelete, value, data }: Props = $props();

  let loading = $state(false);

  async function handleDelete() {
    try {
      loading = true;
      const ids = data
        .filter((item) => item.path.includes(value.id as string))
        .filter((n) => n)
        .map((item) => item._id);

      if (ondelete) {
        ondelete(ids);
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

<div class="DeleteActivity">
  <Button
    aria-label="Delete activity"
    class="DeleteActivityButton"
    roundness={1}
    title="Delete activity"
    compact
    color="danger"
    size="small"
    onclick={deleteConfirmation}
    background="none"
    variant="text"
    disabled={loading}
  >
    <Icon icon="material-symbols:delete-outline-rounded" />
  </Button>
</div>

<style lang="scss">
  .DeleteActivity {
    :global(.dodo-ui-Button.size--small.DeleteActivityButton) {
      font-size: 1.3rem;
    }
  }
</style>
