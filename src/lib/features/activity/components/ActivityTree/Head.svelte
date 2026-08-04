<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
  } from './ActivityTree.svelte';
  import ActivityHeadNode from './PlanTypes/Sequence/ActivityHeadNode/ActivityHeadNode.svelte';

  type Props = {
    planType: PlanType;
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    editMode: boolean;
  };

  const { planType, value, oncreate, onupdate, editMode }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <ActivityHeadNode {value} {oncreate} {onupdate} {editMode} />
{:else}
  yo
{/if}
