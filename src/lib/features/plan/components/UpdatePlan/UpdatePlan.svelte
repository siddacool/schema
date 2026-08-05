<script lang="ts">
  import { Button, Column, Grid, TextInput } from '@flightlesslabs/dodo-ui';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import type { Plan } from '../../types';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { savePlan } from '../../logic/crud.svelte';
  import { planDetailStore } from '../../store/detail.svelte';

  const plan = $derived(planDetailStore.plan);
  let name = $derived(plan?.name || '');
  const isDataValid = $derived(name ? true : false);
  let loading = $state(false);

  async function submit(event: SubmitEvent) {
    try {
      loading = true;
      event.preventDefault();

      if (!plan) {
        return;
      }

      if (!isDataValid) {
        return;
      }

      const eventSubmitter = event.submitter;

      if (!eventSubmitter?.classList.contains('event-submitter')) {
        return;
      }

      const formData: Plan = {
        ...plan,
        name,
      };

      const planId = await savePlan(formData);

      toasts.add({
        title: 'Plan updated',
        color: 'safe',
      });

      goto(resolve(`/plans/${planId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to update plan',
        description: message,
        color: 'danger',
      });
    } finally {
      loading = false;
    }
  }
</script>

<div class="UpdatePlan">
  <form onsubmit={submit}>
    <Grid gap={2}>
      <Column>
        <p class="decoratedTitle">Change plan name</p>
        <TextInput
          placeholder="e.g. Gym routine"
          name="name"
          bind:value={name}
          disabled={loading}
          size="large"
        />
      </Column>
      <Column>
        <Button type="submit" disabled={!isDataValid || loading} class="event-submitter">
          Save
        </Button>
      </Column>
    </Grid>
  </form>
</div>

<style lang="scss">
  .UpdatePlan {
    margin-top: calc(var(--dodo-ui-space) * 1);

    .decoratedTitle {
      font-family: 'Crimson Pro', serif;
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
