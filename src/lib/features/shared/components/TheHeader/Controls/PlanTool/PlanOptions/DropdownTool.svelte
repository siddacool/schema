<script lang="ts">
  import { Dropdown, DropdownMenu } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
  };

  const { children }: Props = $props();
</script>

<Dropdown
  aria-label="Plan tool"
  triggerProps={{
    title: 'Plan tool',
    variant: 'text',
    roundness: 1,
    class: 'TheHeaderPlanOptionsButton',
    outline: true,
  }}
>
  <Icon icon="dashicons:arrow-down" />

  {#snippet customMenu()}
    <DropdownMenu align="end" class="TheHeaderPlanOptions">
      {@render children?.()}
    </DropdownMenu>
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.TheHeaderPlanOptionsButton.dodo-ui-Button.size--normal) {
    font-size: 1.6rem;
  }

  :global(.TheHeaderPlanOptions .Icon) {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
