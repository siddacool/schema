<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
  } from './ActivityTree.svelte';
  import ActivityHeadNode from './PlanTypes/Sequence/ActivityHeadNode/ActivityHeadNode.svelte';
  import type { Activity } from '../../types';

  type Props = {
    planType: PlanType;
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    data: Activity[];
  };

  const { planType, value, oncreate, onupdate, ondelete, editMode, data }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <ActivityHeadNode {value} {oncreate} {onupdate} {ondelete} {editMode} {data} />
{:else}
  yo
{/if}
