<script lang="ts">
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  const activity = $derived(activityListStore.activityBackup);
  const activityGroup = $derived(
    planDetailStore.plan?.type === PlanType.WEEK ? groupActivity(activity, PlanType.WEEK) : [],
  );
  const isAvailableDays = $derived(activityGroup.length >= 7);
  const isDisabled = $derived(
    planDetailStore.plan?.editMode === false ||
      (planDetailStore.plan?.type === PlanType.WEEK && isAvailableDays),
  );

  function onclick() {
    const button = document.getElementById('ActivityFolderMainCreateButton');

    button?.click();
  }
</script>

<div class="Add">
  <Button
    aria-label="Add new activity"
    class="AddActivityButton"
    roundness={1}
    title="Add new activity"
    compact
    color="primary"
    {onclick}
    variant="solid"
    disabled={isDisabled}
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<style lang="scss">
  .Add {
    :global(.dodo-ui-Button.size--normal.AddActivityButton) {
      font-size: 1.8rem;
    }
  }
</style>
