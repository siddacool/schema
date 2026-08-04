<script lang="ts" module>
  export type ActivityTreeOnCreate = (data: ActivityCreateFormData) => Promise<void>;
  export type ActivityTreeOnUpdate = (data: Activity) => Promise<void>;
  export type ActivityTreeOnDelete = (data: string) => Promise<void>;
  export type ActivityTreeOnSelect = (node: ActivityNodeValue | undefined) => void;
  export type ActivityTreeOnInlineEditorShow = (node: ActivityNodeValue) => void;
  export type ActivityNodeValue = LTreeNode<Activity>;
  export type ActivityTreeRefvalue = Tree<Activity>;
</script>

<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Tree, type DropOperation, type LTreeNode } from '@keenmate/svelte-treeview';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import ActivityNode from './ActivityNode/ActivityNode.svelte';
  import Head from './Head.svelte';
  import MainCreate from './MainCreate.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    ondragndrop?: (data: Activity[]) => void;
    maxLevels?: number;
    editMode?: boolean;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete: ondeleteRaw,
    maxLevels = 5,
    editMode = false,
    ondragndrop,
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));

  let selectedNode = $derived<ActivityNodeValue | undefined>(undefined);
  let inlineEditorOn = $derived<boolean>(false);
  let showInlineEditor = $derived<boolean>(inlineEditorOn ? true : false);

  const sortCallback = (items: ActivityNodeValue[]) => {
    return items;
  };

  function onselect(node: ActivityNodeValue | undefined) {
    inlineEditorOn = false;

    if (!node) {
      selectedNode = undefined;
      return;
    }

    if (!selectedNode || selectedNode?.id !== node.id) {
      selectedNode = node;
    } else {
      selectedNode = undefined;
    }
  }

  function ondelete(data: string) {
    onselect(undefined);

    if (ondeleteRaw) {
      ondeleteRaw(data);
    }
  }

  function onInlineEditorShow(node: ActivityNodeValue) {
    if (inlineEditorOn) {
      inlineEditorOn = false;
      return;
    }

    if (!selectedNode) {
      inlineEditorOn = false;
      return;
    }

    if (selectedNode.id === node.id) {
      inlineEditorOn = true;
    }
  }

  let treeRef = $state<ActivityTreeRefvalue>();

  type DropPosition = 'above' | 'below' | 'child';

  function getAllowedDropPositions(node: ActivityNodeValue): DropPosition[] {
    // Only allow reordering before/after the target.
    // Never allow dropping inside the target.
    return ['below'];
  }

  function getParentPath(path: string): string {
    const lastDotIndex = path.lastIndexOf('.');

    // Root nodes have no parent.
    if (lastDotIndex === -1) {
      return '';
    }

    return path.substring(0, lastDotIndex);
  }

  function beforeDrop(
    dropNode: ActivityNodeValue | null,
    draggedNode: ActivityNodeValue,
    position: DropPosition,
  ) {
    // Don't allow level 1 nodes to be moved
    if (draggedNode.level === 1) {
      return false;
    }

    if (draggedNode.hasChildren) {
      return false;
    }

    if (!dropNode) {
      return false;
    }

    // Never allow nesting.
    if (position === 'child') {
      return false;
    }

    // Only allow nodes with the same parent.
    const draggedParentPath = getParentPath(draggedNode.path);
    const dropParentPath = getParentPath(dropNode.path);

    return draggedParentPath === dropParentPath;
  }

  async function onNodeDrop(
    _dropNode: ActivityNodeValue | null,
    draggedNode: ActivityNodeValue,
    _position: DropPosition,
    _event: DragEvent | TouchEvent,
    operation: DropOperation,
  ) {
    if (operation !== 'move' || !treeRef) {
      return;
    }

    const parentPath = getParentPath(draggedNode.path);

    const siblings = treeRef.getChildren(parentPath);

    const items = siblings.map((node, index) => ({
      ...node.data,
      sortOrder: index + 1,
    })) as Activity[];

    console.log('debug:', items);

    if (ondragndrop) {
      ondragndrop(items);
    }
  }
</script>

<div class={classes.join(' ')}>
  <Tree
    treeId="ActivityTreeMain"
    {data}
    bind:this={treeRef}
    idMember="_id"
    pathMember="path"
    displayValueMember="description"
    expandLevel={maxLevels}
    bodyClass="ActivityTreeMain"
    shouldToggleOnNodeClick={false}
    dragDropMode="none"
    getAllowedDropPositionsCallback={getAllowedDropPositions}
    beforeDropCallback={beforeDrop}
    {onNodeDrop}
    {sortCallback}
  >
    {#snippet nodeTemplate(node: ActivityNodeValue | undefined)}
      {#if node?.level === 1}
        <Head
          value={node}
          {planType}
          {oncreate}
          {onupdate}
          ondelete={ondelete as ActivityTreeOnDelete}
          {editMode}
          {selectedNode}
          {onselect}
          {showInlineEditor}
          {onInlineEditorShow}
        />
      {:else if node}
        <ActivityNode
          value={node}
          {maxLevels}
          {oncreate}
          ondelete={ondelete as ActivityTreeOnDelete}
          {onupdate}
          {editMode}
          {selectedNode}
          {onselect}
          {showInlineEditor}
          {onInlineEditorShow}
        />
      {/if}
    {/snippet}
  </Tree>

  <MainCreate {oncreate} {planType} {editMode} />
</div>
