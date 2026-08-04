<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate } from './ActivityTree.svelte';
  import CreateHeadNode from './PlanTypes/Sequence/CreateHeadNode/CreateHeadNode.svelte';

  type Props = {
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    editMode: boolean;
  };

  const { planType, oncreate, editMode }: Props = $props();
</script>

{#if editMode}
  {#if planType === PlanType.SEQUENCE}
    <CreateHeadNode {oncreate} />
  {:else}
    yo
  {/if}
{/if}
