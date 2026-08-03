<script lang="ts">
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type { ActivityTreeOnCreate, ActivityTreeOnUpdate } from '../../ActivityTree.svelte';
  import CreateActivity from '../Edit/CreateActivity/CreateActivity.svelte';
  import UpdateActivity from '../Edit/UpdateActivity/UpdateActivity.svelte';
  import type { ActivityNodeValue } from './ActivityNode.svelte';

  type Props = {
    value: ActivityNodeValue;
    planType: PlanType;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    maxLevels: number;
  };

  const { value, planType, oncreate, onupdate, maxLevels }: Props = $props();
</script>

<div class="Controls">
  {#if value.data}
    <UpdateActivity {onupdate} data={value.data} />
  {/if}

  {#if value.level && value.level <= maxLevels}
    <CreateActivity path={value.path} {oncreate} />
  {/if}
</div>

<style lang="scss">
  .Controls {
    margin-left: var(--dodo-ui-space);
    display: flex;

    :global(.dodo-ui-UtilityButton) {
      margin: 0 4px;
    }
  }
</style>
