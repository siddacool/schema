<script lang="ts">
  import MarkdownEngine from '$lib/components/MarkdownEngine/MarkdownEngine.svelte';
  import type { Activity } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../types';
  import Icon from '@iconify/svelte';

  type Props = {
    data: Activity;
    class?: string;
    onexpand: (data: Activity, expandState: boolean) => Promise<void>;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
  };

  const { class: className = '', node, onselect, onexpand, data }: Props = $props();

  const expanded = $derived(node.isExpanded);
  const classes = $derived(
    ['HeaderTrigger', `${expanded ? 'expanded' : ''}`, className].filter(Boolean),
  );

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

    onexpand(data, !expanded);
  }

  function onkeydown(e: KeyboardEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')} {onclick} {onkeydown} role="presentation">
  <spn class="TriggerIcon">
    <Icon icon="weui:arrow-filled" />
  </spn>

  <div class="description"><MarkdownEngine source={node.data?.description || ''} /></div>
</div>

<style lang="scss">
  .HeaderTrigger {
    background-color: transparent;
    border: 0;
    display: flex;
    width: 100%;
    padding: var(--dodo-ui-space);
    display: flex;
    align-items: flex-start;
    flex: 1;
    min-height: 40px;
    color: inherit;
    font-family: inherit;
    cursor: pointer;

    .description {
      margin: 0;
      margin-left: var(--dodo-ui-space);
      font-size: 1rem;
      overflow: hidden;
      margin-top: 2px;

      @media (min-width: 600px) {
        font-size: 1.1rem;
      }
    }

    :global(.TriggerIcon) {
      font-size: 1.5rem;
      display: inline-flex;
      align-items: center;
    }

    &.expanded {
      :global(.TriggerIcon) {
        rotate: 90deg;
      }
    }
  }
</style>
