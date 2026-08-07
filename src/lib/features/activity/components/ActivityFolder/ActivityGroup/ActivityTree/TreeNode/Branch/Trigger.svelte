<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';
  import { UtilityButton } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

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
  <UtilityButton class="TriggerButton" compact {onclick}>
    <Icon icon="weui:arrow-filled" />
  </UtilityButton>
</div>

<style lang="scss">
  .Trigger {
    :global(.TriggerButton.dodo-ui-UtilityButton.size--normal) {
      font-size: 1.5rem;
    }

    &.expanded {
      :global(.TriggerButton) {
        rotate: 90deg;
      }
    }
  }
</style>
