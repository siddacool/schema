<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { Text } from '@flightlesslabs/dodo-ui';
  import type { Activity } from '$lib/features/activity/types';

  type Props = {
    ondelete?: (data: string) => Promise<void>;
    data: Activity;
  };

  let { ondelete, data }: Props = $props();

  async function handleDelete() {
    try {
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
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete activity',
      description: 'Are you sure you want to delete this activity?',
      onaccept: handleDelete,
    });
  }
</script>

<DropdownMenuItem
  onSelect={deleteConfirmation}
  outline
  class="TreeNodeToolbarDropdownMenuItemDelete"
>
  <Text color="danger">
    <span class="Icon">
      <Icon icon="material-symbols:delete-outline-rounded" />
    </span>
  </Text>

  Delete
</DropdownMenuItem>

<style lang="scss">
  :global(.TreeNodeToolbarDropdownMenuItemDelete .Icon) {
    font-size: 1.3rem;
  }
</style>
