<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../ActivityTree.svelte';
  import Toolbar from './Toolbar/Toolbar.svelte';
  import { Card } from '@flightlesslabs/dodo-ui';

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
    selectedNode: string | undefined;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
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
    selectedNode,
    onselect: onselectBase,
  }: Props = $props();

  const isSelected = $derived(selectedNode === node.id);
  const classes = $derived(
    ['Node', `${isSelected && !node.hasChildren ? 'isSelected' : ''}`, className].filter(Boolean),
  );

  function onselect(e: MouseEvent) {
    e.stopPropagation();

    if (node.hasChildren) {
      onselectBase(undefined);
    } else {
      onselectBase(node.id as string);
    }
  }
</script>

<div class={classes.join(' ')}>
  <Card class="TreeNodeCard" shadow={0}>
    <button class="description" onclick={onselect}>{node.data?.description}</button>
    <Toolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
  </Card>
</div>

<style lang="scss">
  .Node {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: inherit;
    text-decoration: none;
    margin: 0;
    padding: 0;

    :global(.TreeNodeCard) {
      display: flex;
      padding-right: calc(var(--dodo-ui-space));
      align-items: center;
    }

    &:hover {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-100);
      }
    }

    &.isSelected {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-primary-100);
      }

      &:hover {
        :global(.TreeNodeCard) {
          background-color: var(--dodo-color-primary-200);
        }
      }
    }

    .description {
      margin: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 0.95rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-family: inherit;
      padding: 0;
      border: 0;
      background-color: transparent;
      padding: calc(var(--dodo-ui-space)) 0;
      padding-left: calc(var(--dodo-ui-space));
      height: 100%;
    }
  }
</style>
