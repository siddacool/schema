<script lang="ts">
  import Icon from '@iconify/svelte';
  import { PlanType } from '../types/plan-type';

  type Props = {
    value: PlanType;
    class?: string;
  };

  let { value, class: className = '' }: Props = $props();

  const classes = $derived(['PlanTypeIcon', `value--${value}`, className].filter(Boolean));
</script>

<span class={classes.join(' ')}>
  {#if value === PlanType.SEQUENCE}
    <Icon icon="lsicon:path-outline"></Icon>
  {:else if value === PlanType.WEEK}
    <Icon icon="qlementine-icons:task-16"></Icon>
  {:else if value === PlanType.CALENDAR}
    <Icon icon="qlementine-icons:calendar-16"></Icon>
  {/if}
</span>

<style lang="scss">
  .PlanTypeIcon {
    display: inline-flex;
    align-items: center;
    color: inherit;
    font-size: inherit;
  }
</style>
