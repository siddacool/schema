<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import { Text } from '@flightlesslabs/dodo-ui';
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import type { ActivityTreeNodeValue } from '../../../../types';

  type Props = {
    data: Activity;
    maxLevels: number;
    node: ActivityTreeNodeValue;
  };

  const { data, maxLevels, node }: Props = $props();

  const show = $derived(node.level && node.level <= maxLevels);

  function onclick() {
    const button = document.getElementById(`AddActivity-${data._id}`);

    button?.click();
  }
</script>

{#if show}
  <DropdownMenuItem class="TreeNodeToolbarDropdownMenuItemAddActivityAdd" {onclick}>
    <Text color="primary">
      <span class="Icon">
        <Icon icon="material-symbols:add-rounded" />
      </span>
    </Text>

    Add child
  </DropdownMenuItem>
{/if}

<style lang="scss">
  :global(.TreeNodeToolbarDropdownMenuItemAddActivityAdd .Icon) {
    font-size: 1.6rem;
  }
</style>
