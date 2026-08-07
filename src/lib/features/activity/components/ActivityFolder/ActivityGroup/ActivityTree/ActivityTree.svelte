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
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    startOfWeek: WeekDays;
    treeRef: ActivityTreeRefvalue | undefined;
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
    startOfWeek,
    treeRef = $bindable(),
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));

  const sortCallback = (items: ActivityTreeNodeValue[]) => {
    return items;
  };

  const data = $derived(group.activity);

  let selectedNode = $state<string | undefined>(undefined);

  function onselect(value: string | undefined) {
    if (selectedNode !== value) {
      selectedNode = value;
    } else {
      selectedNode = undefined;
    }
  }

  async function oncreateMod(value: ActivityCreateFormData) {
    if (oncreate) {
      await oncreate(value, true);
    }
  }

  async function onupdateMod(value: Activity) {
    if (onupdate) {
      await onupdate(value, true);
    }
  }

  async function ondeleteMod(value: string) {
    if (ondelete) {
      await ondelete(value, true);
    }
  }
</script>

<div class={classes.join(' ')}>
  <Tree
    bind:this={treeRef}
    treeId={`ActivityFolderActivityTree-${group._id}`}
    {data}
    idMember="_id"
    pathMember="path"
    displayValueMember="description"
    expandLevel={0}
    bodyClass="ActivityFolderActivityTree"
    shouldToggleOnNodeClick={false}
    {sortCallback}
  >
    {#snippet nodeTemplate(node: ActivityTreeNodeValue | undefined)}
      {#if node}
        <TreeNode
          {planType}
          oncreate={oncreateMod}
          onupdate={onupdateMod}
          ondelete={ondeleteMod}
          {editMode}
          {node}
          {group}
          {maxLevels}
          {selectedNode}
          {onselect}
        />
      {/if}
    {/snippet}
  </Tree>
</div>
