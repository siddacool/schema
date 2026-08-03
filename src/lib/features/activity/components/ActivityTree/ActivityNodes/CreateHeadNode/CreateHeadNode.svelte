<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate } from '../../ActivityTree.svelte';
  import Sequence from './Sequence/Sequence.svelte';

  type Props = {
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
  };

  let { planType, oncreate }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <Sequence {oncreate} />
{:else}
  yo
{/if}
