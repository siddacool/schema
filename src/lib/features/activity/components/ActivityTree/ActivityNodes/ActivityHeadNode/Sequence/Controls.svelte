<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../../ActivityTree.svelte';
  import type { ActivityNodeValue } from '../../ActivityNode/ActivityNode.svelte';
  import CreateActivity from '../../Edit/CreateActivity/CreateActivity.svelte';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
  };

  const { value, planType, oncreate, onupdate }: Props = $props();
</script>

<div class="Controls">
  <CreateActivity path={value.path} {oncreate} />
</div>

<style lang="scss">
  .Controls {
    margin-left: var(--dodo-ui-space);
  }
</style>
