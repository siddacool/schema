<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import { DropdownMenuItem } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = {
    data: Activity;
  };

  const { data }: Props = $props();

  function onclick() {
    const button = document.getElementById(`EditButton-${data._id}`);

    button?.click();
  }
</script>

<DropdownMenuItem outline class="TreeNodeToolbarDropdownMenuItemDeleteEdit" {onclick}>
  <span class="Icon">
    <Icon icon="material-symbols:edit-outline" />
  </span>
  Edit
</DropdownMenuItem>

<style lang="scss">
  :global(.TreeNodeToolbarDropdownMenuItemDeleteEdit .Icon) {
    font-size: 1.3rem;
  }
</style>
