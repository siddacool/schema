<script lang="ts" module>
  export type ActivityNodeValue = LTreeNode<Activity>;
</script>

<script lang="ts">
  import type { Activity } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import type { LTreeNode } from '@keenmate/svelte-treeview';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
  };

  let { value, planType }: Props = $props();

  $effect(() => {
    console.log('debug:', value);
  });
</script>

<div class="ActivityNode">{value.data?.description}</div>

<style lang="scss">
  .ActivityNode {
    padding-left: calc(var(--dodo-ui-space) / 2);
    margin-bottom: calc(var(--dodo-ui-space) / 2);
  }
</style>
