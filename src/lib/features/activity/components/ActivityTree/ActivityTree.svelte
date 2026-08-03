<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Tree } from '@keenmate/svelte-treeview';
  import type { Activity } from '../../types';
  import type { ActivityNodeValue } from './ActivityNodes/ActivityNode/ActivityNode.svelte';
  import ActivityHeadNode from './ActivityNodes/ActivityHeadNode/ActivityHeadNode.svelte';
  import ActivityNode from './ActivityNodes/ActivityNode/ActivityNode.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: Activity[];
  };

  const { class: className = '', planType, data }: Props = $props();

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
        <ActivityHeadNode value={node} {planType} />
      {:else if node}
        <ActivityNode value={node} {planType} />
      {/if}
    {/snippet}
  </Tree>
</div>

<style lang="scss">
</style>
