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
  };

  const { class: className = '', planType, data }: Props = $props();

  const classes = $derived(['HeaderDescription', className].filter(Boolean));
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
