<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityNodeValue } from '../ActivityNode/ActivityNode.svelte';
  import Sequence from './Sequence/Sequence.svelte';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
  };

  let { value, planType }: Props = $props();

  $effect(() => {
    console.log('debug:', value);
  });
</script>

{#if planType === PlanType.SEQUENCE}
  <Sequence {value} />
{:else}
  yo
{/if}

<style lang="scss">
</style>
