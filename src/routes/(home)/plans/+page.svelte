<script lang="ts">
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';
  import { getSortedActivities } from '$lib/features/activity/utils/get-sorted-activities/get-sorted-activities';

  const data = $derived(getSortedActivities(activityListMockData));

  $effect(() => {
    console.log('debug:', data);
  });
</script>

<div></div>

<style lang="scss">
</style>
