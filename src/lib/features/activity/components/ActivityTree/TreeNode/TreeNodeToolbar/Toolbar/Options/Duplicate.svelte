<script lang="ts">
  import { DropdownMenuItem, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import type { Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../../../types';
  import { Text } from '@flightlesslabs/dodo-ui';

  type Props = {
    onduplicate?: (data: Activity) => Promise<void>;
    data: Activity;
    node: ActivityTreeNodeValue;
  };

  let { onduplicate, data, node }: Props = $props();

  const isBranch = $derived(node.hasChildren);

  async function handleDuplicate() {
    try {
      if (onduplicate) {
        onduplicate(data);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to duplicate activity',
        description: message,
        color: 'danger',
      });
    }
  }
</script>

{#if !isBranch}
  <DropdownMenuItem
    onSelect={handleDuplicate}
    outline
    class="TreeNodeToolbarDropdownMenuItemDuplicate"
  >
    <Text color="primary">
      <span class="Icon">
        <Icon icon="ion:duplicate-outline" />
      </span>
    </Text>

    Duplicate
  </DropdownMenuItem>
{/if}

<style lang="scss">
  :global(.TreeNodeToolbarDropdownMenuItemDuplicate .Icon) {
    font-size: 1.3rem;
  }
</style>
