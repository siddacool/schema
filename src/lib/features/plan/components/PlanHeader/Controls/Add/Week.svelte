<script>
  import { modals } from '@flightlesslabs/dodo-ui-bits';
  import BaseAddButton from './BaseAddButton.svelte';
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { PlanType } from '$lib/features/plan/types/plan-type';

  const activity = $derived(activityListStore.activityBackup);
  const activityGroup = $derived(groupActivity(activity, PlanType.WEEK));
  const daysExceeded = $derived(activityGroup.length >= 7);

  function onclick() {
    if (daysExceeded) {
      modals.add('inform', {
        title: 'Week days exceeded',
        description: `Days exceeded. Only 7 days are allowed`,
      });

      return;
    }

    const button = document.getElementById('ActivityFolderMainCreateButton');

    button?.click();
  }
</script>

<BaseAddButton preventAdd={daysExceeded} {onclick} title="Add day" />
