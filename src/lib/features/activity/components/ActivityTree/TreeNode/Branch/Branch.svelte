<script lang="ts">
  import type { Activity, ActivityCreateFormData } from '$lib/features/activity/types';
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
    onexpand: (data: Activity, expandState: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
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
    onexpand,
  }: Props = $props();

  const expanded = $derived(node.isExpanded);
  const classes = $derived(['Branch', className].filter(Boolean));
</script>

<BaseNodeContainer class={classes.join(' ')} {expanded} branch>
  <HeaderTrigger {onexpand} {node} {data} {onselect} />

  {#if expanded}
    <TreeNodeToolbar {oncreate} {onupdate} {ondelete} {maxLevels} {editMode} {node} {data} />
  {/if}
</BaseNodeContainer>
