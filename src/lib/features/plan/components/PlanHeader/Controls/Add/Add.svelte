<script lang="ts">
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import ReadMode from './ReadMode.svelte';
  import Week from './Week.svelte';
  import Calendar from './Calendar.svelte';
  import Sequence from './Sequence.svelte';

  const planType = $derived(planDetailStore.plan?.type);
  const editMode = $derived(planDetailStore.plan?.editMode === false ? false : true);
</script>

{#if !editMode}
  <ReadMode />
{:else if planType === PlanType.WEEK}
  <Week />
{:else if planType === PlanType.CALENDAR}
  <Calendar />
{:else}
  <Sequence />
{/if}
