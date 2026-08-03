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

  const classes = $derived(
    [
      'ActivityHeadNode',
      `${value.isExpanded ? 'isExpanded' : ''}`,
      `${value.hasChildren ? 'hasChildren' : ''}`,
    ].filter(Boolean),
  );
</script>

<div class={classes.join(' ')}>
  {#if planType === PlanType.SEQUENCE}
    <Sequence {value} {oncreate} {onupdate} />
  {:else}
    yo
  {/if}
</div>

<style lang="scss">
  .ActivityHeadNode {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding-left: calc(var(--dodo-ui-space));
    margin-bottom: calc(var(--dodo-ui-space) * 3);
    font-size: 1.1rem;
    font-weight: 400;

    &.isExpanded {
      margin-bottom: calc(var(--dodo-ui-space) / 1.5);
    }
  }
</style>
