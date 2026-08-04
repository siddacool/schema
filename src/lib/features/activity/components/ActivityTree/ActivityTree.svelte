<script lang="ts" module>
  export type ActivityTreeOnCreate = (data: ActivityCreateFormData) => Promise<void>;
  export type ActivityTreeOnUpdate = (data: Activity) => Promise<void>;
  export type ActivityTreeOnDelete = (data: string) => Promise<void>;
  export type ActivityNodeValue = LTreeNode<Activity>;
  export type ActivityTreeRefvalue = Tree<Activity>;
</script>

<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Tree, type LTreeNode } from '@keenmate/svelte-treeview';
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
    maxLevels?: number;
    editMode?: boolean;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    maxLevels = 5,
    editMode = false,
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));

  const sortCallback = (items: ActivityNodeValue[]) => {
    return items;
  };
</script>

<div class={classes.join(' ')}>
  <Tree
    treeId="ActivityTreeMain"
    {data}
    idMember="_id"
    pathMember="path"
    displayValueMember="description"
    expandLevel={maxLevels}
    bodyClass="ActivityTreeMain"
    shouldToggleOnNodeClick={false}
    {sortCallback}
  >
    {#snippet nodeTemplate(node: ActivityNodeValue | undefined)}
      {#if node?.level === 1}
        <Head value={node} {planType} {oncreate} {onupdate} {ondelete} {editMode} />
      {:else if node}
        <ActivityNode value={node} {maxLevels} {oncreate} {ondelete} {onupdate} {editMode} />
      {/if}
    {/snippet}
  </Tree>

  <MainCreate {oncreate} {planType} {editMode} />
</div>
