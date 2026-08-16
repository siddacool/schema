<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { ActivityTreeNodeValue } from '../../types';
  import HeaderTrigger from './HeaderTrigger.svelte';
  import TreeNodeToolbar from '../TreeNodeToolbar/TreeNodeToolbar.svelte';
  import BaseNodeContainer from '../BaseNodeContainer.svelte';

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
    trackedPaths: string[] | undefined;
    track: boolean;
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
    trackedPaths,
    track,
  }: Props = $props();

  const isSelected = $derived(selectedNode === node.id);
  const classes = $derived(['Leaf', className].filter(Boolean));
</script>

<BaseNodeContainer class={classes.join(' ')} expanded={editMode && isSelected}>
  <Card class="TreeNodeCard" shadow={0}>
    <HeaderTrigger {onselect} {node} {editMode} {trackedPaths} {track} />

    {#if isSelected}
      <TreeNodeToolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
    {/if}
  </Card>
</BaseNodeContainer>
