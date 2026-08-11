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
  aria-label="Plan options"
  triggerProps={{
    title: 'Plan options',
    variant: 'text',
    roundness: 1,
    compact: true,
    class: 'PlanHeaderPlanOptionsButton',
    color: 'neutral',
    outline: true,
    size: 'small',
  }}
>
  <Icon icon="material-symbols:menu" />

  {#snippet customMenu()}
    <DropdownMenu
      align="end"
      outline={useThemeStore.theme === 'dark' ? true : false}
      class="PlanHeadePlanOptions"
    >
      {@render children?.()}
    </DropdownMenu>
  {/snippet}
</Dropdown>

<style lang="scss">
  :global(.PlanHeaderPlanOptionsButton.dodo-ui-Button.size--small) {
    font-size: 1.3rem;
  }

  :global(.PlanHeadePlanOptions .Icon) {
    font-size: 1.4rem;
    margin-right: calc(var(--dodo-ui-space) * 1.8);
    display: inline-flex;
  }
</style>
