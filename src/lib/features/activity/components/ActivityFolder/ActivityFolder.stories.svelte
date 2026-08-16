<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityFolder from './ActivityFolder.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';
  import { ModalManager } from '@flightlesslabs/dodo-ui-bits';
  import { activityListMockDataWeek } from '../../mocks/activity-lits-mock-data-week';
  import { activityListMockDataCalendar } from '../../mocks/activity-lits-mock-data-calendar';

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

<Story
  name="Default"
  args={{ data: activityListMockData, planType: PlanType.SEQUENCE, debug: true }}
/>

<Story name="EditMode" asChild>
  <ActivityFolder
    data={activityListMockData}
    planType={PlanType.SEQUENCE}
    editMode
    debug
    id="MainId"
  />
  <ModalManager />
</Story>

<Story name="Week" asChild>
  <ActivityFolder
    data={activityListMockDataWeek}
    planType={PlanType.WEEK}
    editMode
    debug
    id="MainIdWeek"
  />
  <ModalManager />
</Story>

<Story name="Calendar" asChild>
  <ActivityFolder
    data={activityListMockDataCalendar}
    planType={PlanType.CALENDAR}
    editMode
    debug
    id="MainIdCalendar"
  />
  <ModalManager />
</Story>
