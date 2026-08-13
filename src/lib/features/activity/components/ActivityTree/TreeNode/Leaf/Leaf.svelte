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
  const classes = $derived(['Leaf', className].filter(Boolean));
</script>

<BaseNodeContainer class={classes.join(' ')} expanded={isSelected}>
  <Card class="TreeNodeCard" shadow={0}>
    <HeaderTrigger {onselect} {node} />

    {#if isSelected}
      <TreeNodeToolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
    {/if}
  </Card>
</BaseNodeContainer>
