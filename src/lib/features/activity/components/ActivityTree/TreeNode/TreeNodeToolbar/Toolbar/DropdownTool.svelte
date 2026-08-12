<script lang="ts">
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
  import { Dropdown, DropdownMenu } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<Dropdown
  aria-label="Extended options"
  triggerProps={{
    title: 'Extended options',
    variant: 'text',
    roundness: 1,
    compact: true,
    class: 'ActivityFolderHeaderToolbarOptionsButton',
    size: 'small',
    background: 'none',
  }}
>
  <Icon icon="mingcute:more-2-fill" />

  {#snippet customMenu()}
    <DropdownMenu
      align="end"
      outline={useThemeStore.theme === 'dark' ? true : false}
      class="ActivityFolderHeaderToolbarOptions"
    >
      {@render children?.()}
    </DropdownMenu>
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.ActivityFolderHeaderToolbarOptionsButton.dodo-ui-Button.size--small) {
    font-size: 1.4rem;
  }

  :global(.ActivityFolderHeaderToolbarOptions .Icon) {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
