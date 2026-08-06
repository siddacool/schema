<script lang="ts" module>
  export type ActivityTreeNodeValue = LTreeNode<Activity>;
  export type ActivityTreeRefvalue = Tree<Activity>;
</script>

<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import type { WeekDays } from '$lib/features/activity/types/week';
  import { Tree, type LTreeNode } from '@keenmate/svelte-treeview';
  import TreeNode from './TreeNode/TreeNode.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    group: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData) => Promise<void>;
    onupdate?: (data: Activity) => Promise<void>;
    ondelete?: (data: string) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
  };

  const {
    class: className = '',
    planType,
    group,
    oncreate,
    onupdate,
    ondelete,
    maxLevels,
    editMode,
    startOfWeek,
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));

  const sortCallback = (items: ActivityTreeNodeValue[]) => {
    return items;
  };

  const data = $derived(group.activity);
</script>

<div class={classes.join(' ')}>
  <Tree
    treeId={`ActivityFolderActivityTree-${group._id}`}
    {data}
    idMember="_id"
    pathMember="path"
    displayValueMember="description"
    expandLevel={maxLevels}
    bodyClass="ActivityFolderActivityTree"
    shouldToggleOnNodeClick={false}
    {sortCallback}
  >
    {#snippet nodeTemplate(node: ActivityTreeNodeValue | undefined)}
      {#if node}
        <TreeNode
          {planType}
          {oncreate}
          {onupdate}
          {ondelete}
          {editMode}
          {node}
          {group}
          {maxLevels}
        />
      {/if}
    {/snippet}
  </Tree>
</div>
