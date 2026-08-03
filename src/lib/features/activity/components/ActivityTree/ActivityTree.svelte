<script lang="ts" module>
  export type ActivityTreeOnCreate = (data: ActivityCreateFormData) => Promise<void>;
  export type ActivityTreeOnUpdate = (data: Activity) => Promise<void>;
</script>

<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Tree } from '@keenmate/svelte-treeview';
  import type { Activity, ActivityCreateFormData } from '../../types';
  import type { ActivityNodeValue } from './ActivityNodes/ActivityNode/ActivityNode.svelte';
  import ActivityHeadNode from './ActivityNodes/ActivityHeadNode/ActivityHeadNode.svelte';
  import ActivityNode from './ActivityNodes/ActivityNode/ActivityNode.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    maxLevels?: number;
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    maxLevels = 5,
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
        <ActivityHeadNode value={node} {planType} {oncreate} {onupdate} />
      {:else if node}
        <ActivityNode value={node} {planType} {maxLevels} {oncreate} {onupdate} />
      {/if}
    {/snippet}
  </Tree>
</div>

<style lang="scss">
</style>
