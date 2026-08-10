<script lang="ts">
  import { savePlan } from '$lib/features/plan/logic/crud.svelte';
  import { planDetailStore } from '$lib/features/plan/store/detail.svelte';
  import type { Plan } from '$lib/features/plan/types';
  import { Button, Column, FormField, Grid, TextArea } from '@flightlesslabs/dodo-ui';
  import { Modal, toasts } from '@flightlesslabs/dodo-ui-bits';

  type Props = {
    open: boolean;
  };

  let { open = $bindable() }: Props = $props();

  const plan = $derived(planDetailStore.plan);
  let name = $derived(plan?.name || '');
  let loading = $state(false);

  const isDataValid = $derived(name ? true : false);

  function onclear() {
    open = false;
    name = plan?.name || '';
  }

  async function edit() {
    try {
      loading = true;

      if (!plan) {
        return;
      }

      if (!isDataValid) {
        return;
      }

      const formData: Plan = {
        ...plan,
        name,
      };

      await savePlan(formData);

      toasts.add({
        title: 'Plan updated',
        color: 'safe',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to update plan',
        description: message,
        color: 'danger',
      });
    } finally {
      loading = false;
      open = false;
      name = plan?.name || '';
    }
  }
</script>

<Modal bind:open title="Edit plan" {onclear}>
  <Grid gap={2}>
    <Column>
      <FormField label="Plan Name:" for="name">
        <TextArea placeholder="name" name="name" bind:value={name} disabled={loading} />
      </FormField>
    </Column>
  </Grid>

  {#snippet controls()}
    <Button onclick={edit} disabled={loading || !isDataValid}>OK</Button>
  {/snippet}
</Modal>
