<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../ActivityTree.svelte';
  import type { ActivityNodeValue } from '../ActivityNode/ActivityNode.svelte';
  import Sequence from './Sequence/Sequence.svelte';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
  };

  let { value, planType, oncreate, onupdate }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <Sequence {value} {oncreate} {onupdate} />
{:else}
  yo
{/if}
