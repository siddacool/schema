<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';

  import { Card } from '@flightlesslabs/dodo-ui';
  import type { ActivityTreeNodeValue } from '../../types';
  import HeaderTrigger from './HeaderTrigger.svelte';
  import TreeNodeToolbar from '../TreeNodeToolbar/TreeNodeToolbar.svelte';

  type Props = {
    class?: string;
    data: Activity;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
    selectedNode: string | undefined;
  };

  const {
    class: className = '',
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    node,
    onselect,
    selectedNode,
  }: Props = $props();

  const isSelected = $derived(selectedNode === node.id);
  const classes = $derived(
    [
      'Leaf',
      `${isSelected ? 'isSelected' : ''}`,
      `${editMode ? 'editMode' : ''}`,
      className,
    ].filter(Boolean),
  );

  function onclick(e: MouseEvent) {
    e.stopPropagation();
  }

  function onkeydown(e: KeyboardEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')} {onclick} {onkeydown} role="presentation">
  <Card class="TreeNodeCard" shadow={0}>
    <HeaderTrigger {onselect} {node} />

    {#if isSelected}
      <TreeNodeToolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .Leaf {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    z-index: 1;

    :global(.TreeNodeCard) {
      display: flex;
      align-items: center;
      width: 100%;
      transition:
        background-color 100ms,
        color 100ms;
      background-color: transparent;

      &:hover {
        background-color: var(--dodo-color-primary-50);
      }
    }

    &.isSelected {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-200);

        &:hover {
          background-color: var(--dodo-color-primary-100);
        }
      }
    }
  }
</style>
