<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityFolder from './ActivityFolder.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityFolder,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ data: activityListMockData, planType: PlanType.SEQUENCE }} />
