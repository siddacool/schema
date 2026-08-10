<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from './Header.svelte';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import { groupActivity } from '$lib/features/activity/utils/group-activity/group-activity';
  import { activityListMockData } from '$lib/features/activity/mocks/activity-list-mock-data';
  import { Accordion, AccordionItem } from '@flightlesslabs/dodo-ui-bits';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Header,
    tags: ['autodocs'],
  });
  const sequenceData = groupActivity(activityListMockData, PlanType.SEQUENCE);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" asChild>
  <Accordion type="multiple">
    <AccordionItem class="ActivityGroup">
      {#snippet customHeaderContent()}
        <Header
          data={sequenceData[0]}
          planType={PlanType.SEQUENCE}
          editMode
          groups={sequenceData}
        />
      {/snippet}
    </AccordionItem>
  </Accordion>
</Story>
