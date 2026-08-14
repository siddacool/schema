<script lang="ts">
  import { page } from '$app/state';
  import ActivityFolder from '$lib/features/activity/components/ActivityFolder/ActivityFolder.svelte';
  import ActivityListPageInstructions from '$lib/features/activity/components/ActivityListPageInstructions/ActivityListPageInstructions.svelte';
  import {
    deleteActivityNodes,
    saveActivity,
    updateActivityBulk,
  } from '$lib/features/activity/logic/crud.svelte';
  import { activityListStore } from '$lib/features/activity/store/list.svelte';
  import type {
    Activity,
    ActivityCreateData,
    ActivityCreateFormData,
  } from '$lib/features/activity/types';
  import PlanHeader from '$lib/features/plan/components/PlanHeader/PlanHeader.svelte';
  import { updateActivePlan } from '$lib/features/plan/logic/page.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';

  let loading = $derived(true);
  const planId = page.params.planId || '';
  const plan = $derived(planDetailStore.plan);
  const activityList = $derived(activityListStore.activity);
  const editMode = $derived(planDetailStore.plan?.editMode === false ? false : true);
  const showActivityFolder = $derived(activityListStore.activityBackup.length ? true : false);
  const classes = $derived(
    ['PlanListPage', `${showActivityFolder ? 'showActivityFolder' : 'hideActivityFolder'}`].filter(
      Boolean,
    ),
  );

  async function load() {
    await planDetailStore.load(planId);
    await activityListStore.load(planId);
    loading = false;
  }

  async function oncreate(data: ActivityCreateFormData) {
    if (!planId) {
      return;
    }

    const dataFormatted: ActivityCreateData = {
      ...data,
      planId,
    };

    await saveActivity(dataFormatted);
  }

  async function onupdate(data: Activity) {
    if (!planId) {
      return;
    }

    await saveActivity({ ...data, planId });
  }

  async function onbulkupdate(data: Activity[]) {
    if (!planId) {
      return;
    }

    await updateActivityBulk(planId, data);
  }

  async function ondelete(data: string) {
    if (!planId) {
      return;
    }

    await deleteActivityNodes(planId, data);
  }

  $effect(() => {
    load();

    updateActivePlan(planId);
  });
</script>

{#if !loading && plan}
  <div class={classes.join(' ')}>
    <PlanHeader />

    <div class="container">
      <ActivityFolder
        planType={plan.type}
        data={activityList}
        {oncreate}
        {onupdate}
        {editMode}
        {ondelete}
        {onbulkupdate}
        startOfWeek={plan.startOfWeek}
      />

      {#if !showActivityFolder}
        <ActivityListPageInstructions />
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .PlanListPage {
    :global(.ActivityFolderMainCreate) {
      position: absolute;
      z-index: -200;
    }

    :global(.ActivityAccordianView) {
      padding: calc(var(--dodo-ui-space) * 2) 0;
      margin-left: auto;
      margin-right: auto;
      width: 100vw;
      max-width: 800px;
    }

    &.hideActivityFolder {
      :global(.ActivityFolder) {
        position: absolute;
        z-index: -200;
      }
    }
  }

  .container {
    margin-top: 60px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
