<script lang="ts">
  import type { ActivityGroup } from '$lib/features/activity/types';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import CalendarDescription from './CalendarDescription.svelte';
  import DefaultDescription from './DefaultDescription.svelte';
  import WeekDescription from './WeekDescription.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    trackedPaths: string[] | undefined;
    track: boolean;
  };

  const { class: className = '', planType, data, trackedPaths, track }: Props = $props();

  const trackHeader = $derived(track && trackedPaths?.includes(data._id) ? true : false);
  const classes = $derived(
    ['HeaderDescription', `${trackHeader ? 'trackHeader' : ''}`, className].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  {#if planType === PlanType.SEQUENCE}
    <DefaultDescription {data} />
  {:else if planType === PlanType.WEEK}
    <WeekDescription {data} />
  {:else if planType === PlanType.CALENDAR}
    <CalendarDescription {data} />
  {/if}
</div>

<style>
  .HeaderDescription {
    &.trackHeader {
      font-weight: 600;
      color: var(--dodo-color-primary-500);
    }
  }
</style>
