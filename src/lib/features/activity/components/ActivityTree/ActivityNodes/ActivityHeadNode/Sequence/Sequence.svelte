<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import type { ActivityNodeValue } from '../../ActivityNode/ActivityNode.svelte';
  import Controls from './Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    editMode: boolean;
  };

  let { value, oncreate, onupdate, editMode }: Props = $props();
</script>

<div class="Sequence">
  {value.data?.description}

  {#if editMode}
    <Controls {value} planType={PlanType.SEQUENCE} {oncreate} {onupdate} />
  {/if}
</div>

<style lang="scss">
  .Sequence {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
