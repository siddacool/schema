<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import Icon from '@iconify/svelte';
  import type { ActivityTreeNodeValue } from '../../types';
  import { UtilityButton } from '@flightlesslabs/dodo-ui';

  type Props = {
    class?: string;
    onupdate?: (data: Activity) => Promise<void>;
    node: ActivityTreeNodeValue;
    data: Activity;
    onselect: (value: string | undefined) => void;
  };

  const { class: className = '', onupdate, node, data, onselect }: Props = $props();

  const expanded = $derived(node.isExpanded);
  const classes = $derived(['Trigger', `${expanded ? 'expanded' : ''}`, className].filter(Boolean));

  function onclick(e: MouseEvent) {
    e.stopPropagation();

    const button = e.currentTarget as HTMLButtonElement;
    const expandButton =
      button.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.querySelector(
        '.ltree-toggle-icon',
      ) as HTMLButtonElement | null;

    if (expandButton) {
      expandButton?.click();
    }

    onselect(undefined);

    if (onupdate) {
      onupdate({
        ...data,
        expanded: !expanded,
      });
    }
  }
</script>

<div class={classes.join(' ')}>
  <UtilityButton class="TriggerButton" {onclick} compact>
    <Icon icon="material-symbols:arrow-right-rounded" />
  </UtilityButton>
</div>

<style lang="scss">
  .Trigger {
    display: flex;
    padding-left: calc(var(--dodo-ui-space) * 0.8);
    padding-top: calc(var(--dodo-ui-space) * 0.8);
    padding-bottom: calc(var(--dodo-ui-space) * 0.8);

    :global(.TriggerButton.dodo-ui-UtilityButton.size--normal) {
      font-size: 1.8rem;
    }

    &.expanded {
      :global(.TriggerButton.dodo-ui-UtilityButton.size--normal) {
        rotate: 90deg;
      }
    }
  }
</style>
