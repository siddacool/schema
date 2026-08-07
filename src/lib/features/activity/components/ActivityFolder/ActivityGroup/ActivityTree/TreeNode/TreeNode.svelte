<script lang="ts">
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { ActivityTreeNodeValue } from '../ActivityTree.svelte';
  import Node from './Node.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    group: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    node: ActivityTreeNodeValue;
    onselect?: (value: string | undefined) => void;
    selectedNode: string | undefined;
  };

  let {
    class: className = '',
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
  }: Props = $props();

  const classes = $derived(['TreeNode', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Node
    {planType}
    {group}
    {oncreate}
    {onupdate}
    {ondelete}
    {maxLevels}
    {editMode}
    {node}
    {onselect}
    {selectedNode}
  />
</div>

<style lang="scss">
  .TreeNode {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 4px;
  }
</style>
