<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate } from '../../ActivityTree.svelte';
  import Sequence from './Sequence/Sequence.svelte';

  type Props = {
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    readonly: boolean;
  };

  let { planType, oncreate, readonly }: Props = $props();
</script>

{#if !readonly}
  {#if planType === PlanType.SEQUENCE}
    <Sequence {oncreate} />
  {:else}
    yo
  {/if}
{/if}
