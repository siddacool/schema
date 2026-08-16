<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityAccordianView from './ActivityAccordianView.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { activityListMockData } from '../../mocks/activity-list-mock-data';
  import { groupActivity } from '../../utils/group-activity/group-activity';
  import { ModalManager } from '@flightlesslabs/dodo-ui-bits';
  import { activityListMockDataWeek } from '../../mocks/activity-lits-mock-data-week';
  import { activityListMockDataCalendar } from '../../mocks/activity-lits-mock-data-calendar';
  import { Theme } from '@flightlesslabs/dodo-ui';

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
  }}
/>

<Story name="EditMode" asChild>
  <ActivityAccordianView
    data={sequenceData}
    planType={PlanType.SEQUENCE}
    editMode
    maxLevels={3}
    trackedActivity={undefined}
    track
  />
  <ModalManager />
</Story>

<Story name="Week" asChild>
  <ActivityAccordianView
    data={weekData}
    planType={PlanType.WEEK}
    editMode
    maxLevels={3}
    trackedActivity={undefined}
    track
  />
  <ModalManager />
</Story>

<Story name="Calendar" asChild>
  <ActivityAccordianView
    data={calendarData}
    planType={PlanType.CALENDAR}
    editMode
    maxLevels={3}
    trackedActivity={undefined}
    track
  />
  <ModalManager />
</Story>

<Story name="Dark Theme" asChild globals={{ backgrounds: { value: 'dark' } }}>
  <Theme type="dark">
    <ActivityAccordianView
      data={sequenceData}
      planType={PlanType.SEQUENCE}
      editMode
      maxLevels={3}
      trackedActivity={undefined}
      track
    />
    <ModalManager />
  </Theme>
</Story>
