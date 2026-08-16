<script lang="ts">
  import './ActivityTree.scss';
  import type {
    Activity,
    ActivityCreateFormData,
    ActivityGroup,
  } from '$lib/features/activity/types';
  import { Tree } from '@keenmate/svelte-treeview';
  import TreeNode from './TreeNode/TreeNode.svelte';
  import { activityTreeUpdate } from './utils/crud/update';
  import { activityTreeRemove } from './utils/crud/remove';
  import { activityTreeAdd } from './utils/crud/add';
  import type { ActivityTreeNodeValue, ActivityTreeRefvalue } from './types';
  import { activityTreeExpand } from './utils/crud/expand';

  type Props = {
    class?: string;
    group: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onbulkupdate?: (data: Activity[], subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    maxLevels: number;
    editMode: boolean;
    treeRef: ActivityTreeRefvalue | undefined;
    trackedIds: string[] | undefined;
    track: boolean;
  };

  let {
    class: className = '',
    group,
    oncreate,
    onupdate,
    onbulkupdate,
    ondelete,
    maxLevels,
    editMode,
    treeRef = $bindable(),
    trackedIds,
    track,
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));

  const sortCallback = (items: ActivityTreeNodeValue[]) => {
    return items.sort((a, b) => {
      // First, sort by level (shallower levels first)
      const aLevel = a.path.split('.').length;
      const bLevel = b.path.split('.').length;

      if (aLevel !== bLevel) {
        return aLevel - bLevel;
      }

      // Then sort by sortOrder (undefined/null first)
      const aSortOrder = a.data?.sortOrder ?? 0;
      const bSortOrder = b.data?.sortOrder ?? 0;

      return aSortOrder - bSortOrder;
    });
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
    const formData = await activityTreeAdd(treeRef, value, group);

    if (oncreate && formData) {
      await oncreate(formData, true);
    }
  }

  async function onupdateMod(value: Activity) {
    const updatedActivity = await activityTreeUpdate(treeRef, value);

    if (onupdate && updatedActivity) {
      await onupdate(updatedActivity, true);
    }
  }

  async function ondeleteMod(value: string) {
    const deleteCandidate = await activityTreeRemove(treeRef, value);

    if (ondelete && deleteCandidate) {
      await ondelete(deleteCandidate, true);
    }
  }

  async function onexpand(value: Activity, expandState: boolean) {
    const updateCandidates = await activityTreeExpand(treeRef, value, expandState, data);

    if (onbulkupdate && updateCandidates?.length) {
      await onbulkupdate(updateCandidates, true);
    }
  }

  $effect(() => {
    if (!treeRef) {
      return;
    }

    const activity = data;
    const expandedPaths = activity.filter((item) => item.expanded).map((item) => item.path);

    if (expandedPaths.length) {
      treeRef.setExpandedPaths(expandedPaths);
    }
  });
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
          {treeRef}
          oncreate={oncreateMod}
          onupdate={onupdateMod}
          ondelete={ondeleteMod}
          {onexpand}
          {editMode}
          {node}
          {maxLevels}
          {selectedNode}
          {onselect}
          {trackedIds}
          {track}
        />
      {/if}
    {/snippet}
  </Tree>
</div>
