<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import { Text } from '@flightlesslabs/dodo-ui';
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = {
    data: Activity;
  };

  const { data }: Props = $props();

  function onclick() {
    const button = document.getElementById(`AddActivity-${data._id}`);

    button?.click();
  }
</script>

<DropdownMenuItem outline class="ActivityFolderHeaderToolbarDropdownMenuItemAddActivity" {onclick}>
  <Text color="primary">
    <span class="Icon">
      <Icon icon="material-symbols:add-rounded" />
    </span>
  </Text>

  Add child
</DropdownMenuItem>

<style lang="scss">
  :global(.ActivityFolderHeaderToolbarDropdownMenuItemAddActivity .Icon) {
    font-size: 1.6rem;
  }
</style>
