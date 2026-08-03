<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UpdateActivity from './UpdateActivity.svelte';
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: UpdateActivity,
    tags: ['autodocs'],
    args: {
      data: activityListMockData[0],
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
