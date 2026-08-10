<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityGroup from './ActivityGroup.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';
  import { DEFAULT_START_OF_WEEK } from '$lib/features/activity/const/week';
  import { Accordion, ModalManager } from '@flightlesslabs/dodo-ui-bits';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityGroup,
    tags: ['autodocs'],
  });

  const sequenceData = groupActivity(activityListMockData, PlanType.SEQUENCE);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" asChild>
  <Accordion type="multiple">
    <ActivityGroup
      maxLevels={5}
      startOfWeek={DEFAULT_START_OF_WEEK}
      editMode={true}
      data={sequenceData[0]}
      planType={PlanType.SEQUENCE}
      groups={sequenceData}
    />
  </Accordion>
  <ModalManager />
</Story>
