<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import Branch from './Branch/Branch.svelte';
  import Leaf from './Leaf/Leaf.svelte';
  import TreeLines from './TreeLines/TreeLines.svelte';
  import type { ActivityTreeNodeValue, ActivityTreeRefvalue } from '../types';

  type Props = {
    planType: PlanType;
    group: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
    selectedNode: string | undefined;
    treeRef: ActivityTreeRefvalue | undefined;
  };

  let {
    planType,
    group,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    node,
    onselect,
    selectedNode,
    treeRef,
  }: Props = $props();
  const data = $derived(node.data);
</script>

{#if data}
  <TreeLines {node} {treeRef} />
  {#if node.hasChildren}
    <Branch
      {planType}
      {group}
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      {node}
      {data}
      {onselect}
    />
  {:else}
    <Leaf
      {planType}
      {group}
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      {node}
      {data}
      {onselect}
      {selectedNode}
    />
  {/if}
{/if}

<style lang="scss">
  .TreeNode {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 4px;
  }
</style>
