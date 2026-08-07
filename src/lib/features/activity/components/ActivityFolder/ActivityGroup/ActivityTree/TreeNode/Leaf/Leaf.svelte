<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../../ActivityTree.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';
  import Toolbar from '../Toolbar/Toolbar.svelte';
  import Description from './Description.svelte';
  import ListIcon from './ListIcon.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    group: ActivityGroup;
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
    planType,
    group,
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

  function selectToggle() {
    onselect(node.id as string);
  }
</script>

<div class={classes.join(' ')} {onclick} {onkeydown} role="presentation">
  <Card class="TreeNodeCard" shadow={0}>
    <div class="clikable" onclick={selectToggle} role="presentation">
      <ListIcon />
      <Description {node} />
    </div>

    {#if isSelected}
      <Toolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
    {/if}
  </Card>
</div>

<style lang="scss">
  .Leaf {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: inherit;
    text-decoration: none;
    margin: 0;
    padding: 0;

    :global(.TreeNodeCard) {
      padding: 0 calc(var(--dodo-ui-space) * 0.8);
      padding-left: 0;
      display: flex;
      align-items: flex-start;

      &:hover {
        background-color: var(--dodo-color-neutral-100);
      }
    }

    .clikable {
      display: flex;
      align-items: flex-start;
      flex: 1;
      padding: calc(var(--dodo-ui-space) * 0.8);
      padding-right: 0;
      padding-left: 3px;
    }

    :global(.Toolbar) {
      padding: calc(var(--dodo-ui-space) * 0.8) 0;
    }

    &.isSelected {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-primary-100);
      }
    }

    &.editMode.isSelected {
      .clikable {
        min-height: 47px;
      }
    }
  }
</style>
