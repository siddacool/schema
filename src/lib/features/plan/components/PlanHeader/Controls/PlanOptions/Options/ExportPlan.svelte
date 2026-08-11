<script>
  import { exportPlan } from '$lib/features/plan/logic/export.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import { DropdownMenuItem, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  const plan = $derived(planDetailStore.plan);

  async function onclick() {
    try {
      if (!plan) {
        return;
      }

      await exportPlan(plan._id);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to export the plan',
        description: message,
        color: 'danger',
      });
    }
  }
</script>

<DropdownMenuItem outline class="ExportPlanDropdownMenuItem" {onclick}>
  <span class="Icon">
    <Icon icon="material-symbols:download-rounded" />
  </span>
  Export plan
</DropdownMenuItem>

<style lang="scss">
  :global(.ExportPlanDropdownMenuItem .Icon) {
    font-size: 1.4rem;
  }
</style>
