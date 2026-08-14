<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';
  import Branch from './Branch/Branch.svelte';
  import Leaf from './Leaf/Leaf.svelte';
  import TreeLines from './TreeLines/TreeLines.svelte';
  import type { ActivityTreeNodeValue, ActivityTreeRefvalue } from '../types';

  type Props = {
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    onduplicate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    onexpand: (data: Activity, expandState: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
    selectedNode: string | undefined;
    treeRef: ActivityTreeRefvalue | undefined;
  };

  let {
    oncreate,
    onupdate,
    onduplicate,
    ondelete,
    onexpand,
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
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      {node}
      {data}
      {onselect}
      {onexpand}
      {onduplicate}
    />
  {:else}
    <Leaf
      {oncreate}
      {onupdate}
      {ondelete}
      {maxLevels}
      {editMode}
      {node}
      {data}
      {onselect}
      {selectedNode}
      {onduplicate}
    />
  {/if}
{/if}
