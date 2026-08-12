<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
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
  <span class="Icon">
    <Icon icon="material-symbols:add-rounded" />
  </span>
  Add activity
</DropdownMenuItem>

<style lang="scss">
  :global(.ActivityFolderHeaderToolbarDropdownMenuItemAddActivity .Icon) {
    font-size: 1.5rem;
  }
</style>
