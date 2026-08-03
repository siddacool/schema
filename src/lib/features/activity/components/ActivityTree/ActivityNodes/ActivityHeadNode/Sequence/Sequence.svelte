<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import type { ActivityNodeValue } from '../../ActivityNode/ActivityNode.svelte';
  import Controls from './Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
  };

  let { value, oncreate, onupdate }: Props = $props();
</script>

<div class="Sequence">
  {value.data?.description}
  <Controls {value} planType={PlanType.SEQUENCE} {oncreate} {onupdate} />
</div>

<style lang="scss">
  .Sequence {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
