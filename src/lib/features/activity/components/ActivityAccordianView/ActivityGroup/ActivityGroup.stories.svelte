<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ActivityGroup from './ActivityGroup.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';
  import { Accordion, ModalManager } from '@flightlesslabs/dodo-ui-bits';
  import { Theme } from '@flightlesslabs/dodo-ui';

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
      editMode={true}
      data={sequenceData[0]}
      planType={PlanType.SEQUENCE}
      groups={sequenceData}
      trackedActivity={undefined}
      track
    />
  </Accordion>
  <ModalManager />
</Story>

<Story name="Dark Theme" asChild globals={{ backgrounds: { value: 'dark' } }}>
  <Theme type="dark">
    <Accordion type="multiple">
      <ActivityGroup
        maxLevels={5}
        editMode={false}
        data={sequenceData[0]}
        planType={PlanType.SEQUENCE}
        groups={sequenceData}
        trackedActivity={undefined}
        track
      />
    </Accordion>
    <ModalManager />
  </Theme>
</Story>

<Story name="Dark Theme edit" asChild globals={{ backgrounds: { value: 'dark' } }}>
  <Theme type="dark">
    <Accordion type="multiple">
      <ActivityGroup
        maxLevels={5}
        editMode={true}
        data={sequenceData[0]}
        planType={PlanType.SEQUENCE}
        groups={sequenceData}
        trackedActivity={undefined}
        track
      />
    </Accordion>
    <ModalManager />
  </Theme>
</Story>
