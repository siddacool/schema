<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import { Card, useThemeStore } from '@flightlesslabs/dodo-ui';
  import HeaderToolbar from '../../../ActivityFolder/Common/HeaderToolbar/HeaderToolbar.svelte';
  import HeaderTrigger from './HeaderTrigger.svelte';

  type Props = {
    class?: string;
    planType: PlanType;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    editMode: boolean;
    groups: ActivityGroup[];
  };

  const {
    class: className = '',
    planType,
    data,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    groups,
  }: Props = $props();

  const theme = $derived(useThemeStore.theme);

  const classes = $derived(['Header', `theme--${theme}`, className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Card class="ActivityGroupHeaderCard" shadow={0}>
    <HeaderTrigger {data} {planType} />
    <HeaderToolbar {data} {oncreate} {onupdate} {ondelete} {editMode} {planType} {groups} />
  </Card>
</div>

<style lang="scss">
  .Header {
    display: flex;
    width: 100%;
    align-items: center;

    :global(.ActivityGroupHeaderCard) {
      display: flex;
      align-items: center;
      width: 100%;
      transition:
        background-color 100ms,
        color 100ms;
      background-color: var(--dodo-color-white);

      &:hover {
        background-color: var(--dodo-color-primary-100);
      }
    }

    &.theme--dark {
      :global(.ActivityGroupHeaderCard) {
        background-color: var(--dodo-color-neutral-50);

        &:hover {
          background-color: var(--dodo-color-primary-50);
        }
      }
    }
  }
</style>
