<script lang="ts" module>
  export type ActivityTreeOnCreate = (data: ActivityCreateFormData) => Promise<void>;
  export type ActivityTreeOnUpdate = (data: Activity) => Promise<void>;
  export type ActivityNodeValue = LTreeNode<Activity>;
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
    maxLevels?: number;
    editMode?: boolean;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    maxLevels = 5,
    editMode = false,
  }: Props = $props();

  const classes = $derived(['ActivityTree', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Tree
    treeId="ActivityTreeMain"
    {data}
    idMember="_id"
    pathMember="path"
    displayValueMember="description"
    expandLevel={5}
    bodyClass="ActivityTreeMain"
    shouldToggleOnNodeClick={false}
  >
    {#snippet nodeTemplate(node: ActivityNodeValue | undefined)}
      {#if node?.level === 1}
        <Head value={node} {planType} {oncreate} {onupdate} {editMode} />
      {:else if node}
        <ActivityNode value={node} {maxLevels} {oncreate} {onupdate} {editMode} />
      {/if}
    {/snippet}
  </Tree>

  <MainCreate {oncreate} {planType} {editMode} />
</div>

<style lang="scss">
</style>
