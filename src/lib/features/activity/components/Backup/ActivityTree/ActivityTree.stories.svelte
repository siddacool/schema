<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityTree from './ActivityTree.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';
  import { Theme } from '@flightlesslabs/dodo-ui';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityTree,
    tags: ['autodocs'],
    args: {
      planType: PlanType.SEQUENCE,
      data: activityListMockData,
      editMode: true,
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />

<Story
  name="Dark mode"
  asChild
  parameters={{
    backgrounds: {
      default: 'dark',
    },
  }}
>
  <Theme type="dark">
    <ActivityTree planType={PlanType.SEQUENCE} data={activityListMockData} />
  </Theme>
</Story>
