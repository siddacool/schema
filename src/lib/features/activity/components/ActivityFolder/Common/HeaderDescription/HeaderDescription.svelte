<script lang="ts">
  import type { ActivityGroup } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import DefaultDescription from './DefaultDescription.svelte';
  import WeekDescription from './WeekDescription.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
  };

  const { class: className = '', planType, data }: Props = $props();

  const classes = $derived(['HeaderDescription', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  {#if planType === PlanType.SEQUENCE}
    <DefaultDescription {data} />
  {:else if planType === PlanType.WEEK}
    <WeekDescription {data} />
  {/if}
</div>

<style lang="scss">
  .HeaderDescription {
    margin: 0;
    flex: 1;
    margin-left: 4px;
    font-size: 1.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
