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
  <button class="TriggerButton" {onclick}>
    <Icon icon="weui:arrow-filled" />
  </button>
</div>

<style lang="scss">
  .Trigger {
    display: flex;
    .TriggerButton {
      font-size: 1.6rem;
      margin: 0;
      padding: 0;
      border: 0;
      background-color: transparent;
      width: 30px;
      height: 40px;
      color: var(--dodo-color-neutral-800);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: var(--dodo-ui-element-roundness-1);

      &:hover {
        color: var(--dodo-color-primary-800);
      }
    }

    &.expanded {
      .TriggerButton {
        rotate: 90deg;
      }
    }
  }
</style>
