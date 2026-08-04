<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
    ActivityTreeOnSelect,
  } from './ActivityTree.svelte';
  import ActivityHeadNode from './PlanTypes/Sequence/ActivityHeadNode/ActivityHeadNode.svelte';

  type Props = {
    planType: PlanType;
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
  };

  const {
    planType,
    value,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    selectedNode,
    onselect,
  }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <ActivityHeadNode
    {value}
    {oncreate}
    {onupdate}
    {ondelete}
    {editMode}
    {selectedNode}
    {onselect}
  />
{:else}
  yo
{/if}
