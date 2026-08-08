<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityTree from './ActivityTree.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';
  import { DEFAULT_START_OF_WEEK } from '$lib/features/activity/const/week';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityTree,
    tags: ['autodocs'],
  });

  const sequenceData = groupActivity(activityListMockData, PlanType.SEQUENCE)[0];
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story
  name="Default"
  args={{
    group: sequenceData,
    planType: PlanType.SEQUENCE,
    maxLevels: 5,
    editMode: true,
    startOfWeek: DEFAULT_START_OF_WEEK,
  }}
/>
