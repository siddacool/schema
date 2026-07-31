<script lang="ts">
  import './ActivityTree.scss';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Tree } from '@keenmate/svelte-treeview';
  import type { Activity } from '../../types';

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
  />
</div>

<style lang="scss">
</style>
