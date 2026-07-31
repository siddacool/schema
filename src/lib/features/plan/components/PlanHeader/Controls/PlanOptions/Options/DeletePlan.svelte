<script lang="ts">
  import { DropdownMenuItem, modals, toasts } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/state';
  import { Text } from '@flightlesslabs/dodo-ui';
  import { deletePlan } from '$lib/features/plan/logic/crud.svelte';
  import { clearActivePlan } from '$lib/features/plan/logic/page.svelte';

  const planId = page.params.planId || '';

  async function handleDelete() {
    try {
      if (!planId) {
        return;
      }

      await deletePlan(planId);

      toasts.add({
        title: 'Successs',
        description: 'Plan deleted',
        color: 'primary',
      });

      clearActivePlan();

      await goto(resolve('/plans'));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to delete plan',
        description: message,
        color: 'danger',
      });
    }
  }

  function deleteConfirmation() {
    modals.add('confirm', {
      title: 'Delete plan',
      description: 'Are you sure you want to delete this plan?',
      onaccept: handleDelete,
    });
  }
</script>

<DropdownMenuItem onSelect={deleteConfirmation} outline>
  <Text color="danger" class="PlanHeaderOptionDeleteText">
    <span class="Icon">
      <Icon icon="material-symbols:delete-outline-rounded" />
    </span>
    Delete plan
  </Text>
</DropdownMenuItem>

<style lang="scss">
  :global(.PlanHeaderOptionDeleteText) {
    display: flex;
    align-items: center;
  }
</style>
