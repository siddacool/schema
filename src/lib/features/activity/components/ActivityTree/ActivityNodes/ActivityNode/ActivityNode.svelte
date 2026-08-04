<script lang="ts" module>
  export type ActivityNodeValue = LTreeNode<Activity>;
</script>

<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { LTreeNode } from '@keenmate/svelte-treeview';
  import Controls from './Controls.svelte';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../ActivityTree.svelte';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
    maxLevels: number;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    editMode: boolean;
  };

  let { value, planType, maxLevels, oncreate, onupdate, editMode }: Props = $props();
</script>

<div class="ActivityNode">
  {value.data?.description}

  {#if editMode}
    <Controls {value} {planType} {oncreate} {onupdate} {maxLevels} />
  {/if}
</div>

<style lang="scss">
  .ActivityNode {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: calc(var(--dodo-ui-space) / 2);
    margin-bottom: calc(var(--dodo-ui-space) / 1.5);
    font-size: 1rem;
    font-weight: 400;
  }
</style>
