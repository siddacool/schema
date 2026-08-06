<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityFolder from './ActivityFolder.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';
  import { groupActivity } from '../../utils/group-activity/group-activity';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityFolder,
    tags: ['autodocs'],
  });

  const sequenceData = groupActivity(activityListMockData, PlanType.SEQUENCE);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ data: sequenceData, planType: PlanType.SEQUENCE }} />
