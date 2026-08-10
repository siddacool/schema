<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityAccordianView from './ActivityAccordianView.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import { DEFAULT_START_OF_WEEK } from '../../const/week';
  import { ModalManager } from '@flightlesslabs/dodo-ui-bits';
  import { activityListMockDataWeek } from '../../mocks/activity-lits-mock-data-week';
  import { activityListMockDataCalendar } from '../../mocks/activity-lits-mock-data-calendar';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ActivityAccordianView,
    tags: ['autodocs'],
  });

  const sequenceData = groupActivity(activityListMockData, PlanType.SEQUENCE);
  const weekData = groupActivity(activityListMockDataWeek, PlanType.WEEK);
  const calendarData = groupActivity(activityListMockDataCalendar, PlanType.CALENDAR);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story
  name="Default"
  args={{
    data: sequenceData,
    planType: PlanType.SEQUENCE,
    maxLevels: 3,
    editMode: false,
    startOfWeek: DEFAULT_START_OF_WEEK,
  }}
/>

<Story name="EditMode" asChild>
  <ActivityAccordianView
    data={sequenceData}
    planType={PlanType.SEQUENCE}
    editMode
    startOfWeek={DEFAULT_START_OF_WEEK}
    maxLevels={3}
  />
  <ModalManager />
</Story>

<Story name="Week" asChild>
  <ActivityAccordianView
    data={weekData}
    planType={PlanType.WEEK}
    editMode
    startOfWeek={DEFAULT_START_OF_WEEK}
    maxLevels={3}
  />
  <ModalManager />
</Story>

<Story name="Calendar" asChild>
  <ActivityAccordianView
    data={calendarData}
    planType={PlanType.CALENDAR}
    editMode
    startOfWeek={DEFAULT_START_OF_WEEK}
    maxLevels={3}
  />
  <ModalManager />
</Story>
