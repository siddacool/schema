<script lang="ts">
  import type {
    ActivityGroup,
    ActivityCreateFormData,
    Activity,
  } from '$lib/features/activity/types';
  import type { PlanType } from '$lib/features/plan/types/plan-type';
  import BackgoundTools from './BackgoundTools/BackgoundTools.svelte';
  import Toolbar from './Toolbar/Toolbar.svelte';

  type Props = {
    planType: PlanType;
    class?: string;
    data: ActivityGroup;
    oncreate?: (data: ActivityCreateFormData, subActivity?: boolean) => Promise<void>;
    onupdate?: (data: Activity, subActivity?: boolean) => Promise<void>;
    ondelete?: (data: string, subActivity?: boolean) => Promise<void>;
    editMode: boolean;
    groups: ActivityGroup[];
  };

  const {
    class: className = '',
    data: group,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    planType,
    groups,
  }: Props = $props();

  const classes = $derived(['Toolbar', className].filter(Boolean));
  const data = $derived({ ...group, activity: undefined } as Activity);
</script>

{#if editMode}
  <div class={classes.join(' ')}>
    <BackgoundTools {data} {onupdate} {oncreate} {planType} {groups} />
    <Toolbar {data} {planType} {groups} {ondelete} />
  </div>
{/if}

<style lang="scss">
  .Toolbar {
    display: inline-flex;
    align-items: center;
    margin: 0 -3px;

    :global(.dodo-ui-Button),
    :global(.dodo-ui-UtilityButton) {
      margin: 0 3px;
    }
  }
</style>
