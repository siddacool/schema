<script lang="ts">
  import Icon from '@iconify/svelte';
  import { PlanType } from '../types/plan-type';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  type Props = {
    value: PlanType;
    class?: string;
  };

  let { value, class: className = '' }: Props = $props();

  const theme = $derived(useThemeStore.theme);
  const classes = $derived(
    ['PlanTypeIcon', `value--${value}`, `theme--${theme}`, className].filter(Boolean),
  );
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

    &.theme--light {
      &.value--SEQUENCE {
        color: var(--dodo-color-base-amber-700);
      }

      &.value--WEEK {
        color: var(--dodo-color-base-emerald-700);
      }

      &.value--CALENDAR {
        color: var(--dodo-color-base-sky-700);
      }
    }

    &.theme--dark {
      &.value--SEQUENCE {
        color: var(--dodo-color-base-amber-400);
      }

      &.value--WEEK {
        color: var(--dodo-color-base-emerald-400);
      }

      &.value--CALENDAR {
        color: var(--dodo-color-base-sky-400);
      }
    }
  }
</style>
