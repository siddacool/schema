<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate } from './ActivityTree.svelte';
  import CreateHeadNodeSequence from './PlanTypes/Sequence/CreateHeadNode/CreateHeadNode.svelte';
  import CreateHeadNodeWeek from './PlanTypes/Week/CreateHeadNode/CreateHeadNode.svelte';
  import type { WeekDays } from '../../types/week';
  import type { Activity } from '../../types';

  type Props = {
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    editMode: boolean;
    startOfWeek: WeekDays;
    data: Activity[];
  };

  const { planType, oncreate, editMode, startOfWeek, data }: Props = $props();
</script>

{#if editMode}
  {#if planType === PlanType.SEQUENCE}
    <CreateHeadNodeSequence {oncreate} />
  {:else if planType === PlanType.WEEK}
    <CreateHeadNodeWeek {oncreate} {startOfWeek} {data} />
  {:else}
    yo
  {/if}
{/if}
