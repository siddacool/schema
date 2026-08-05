<script lang="ts">
  import { Button, Column, Grid, TextInput } from '@flightlesslabs/dodo-ui';
  import { toasts } from '@flightlesslabs/dodo-ui-bits';
  import { planTypeOptions } from '../../config';
  import type { PlanCreateData } from '../../types';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { savePlan } from '../../logic/crud.svelte';
  import ListPicker from '$lib/components/ListPicker/ListPicker.svelte';

  let name = $state('');
  let type = $state(planTypeOptions[0].value);
  const isDataValid = $derived(name && type ? true : false);
  let loading = $state(false);

  async function submit(event: SubmitEvent) {
    try {
      loading = true;
      event.preventDefault();

      if (!isDataValid) {
        return;
      }

      const eventSubmitter = event.submitter;

      if (!eventSubmitter?.classList.contains('event-submitter')) {
        return;
      }

      const formData: PlanCreateData = {
        name,
        type,
      };

      const planId = await savePlan(formData);

      toasts.add({
        title: 'Plan created',
        color: 'safe',
      });

      goto(resolve(`/plans/${planId}`));
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);

      toasts.add({
        title: 'Failed to create plan',
        description: message,
        color: 'danger',
      });
    } finally {
      loading = false;
    }
  }
</script>

<div class="CreatePlan">
  <form onsubmit={submit}>
    <Grid gap={3}>
      <Column>
        <p class="decoratedTitle">Name your plan</p>
        <TextInput
          placeholder="e.g. Gym routine"
          name="name"
          bind:value={name}
          disabled={loading}
          size="large"
        />
      </Column>
      <Column>
        <p class="decoratedTitle">Pick a plan type</p>
        <ListPicker options={planTypeOptions} bind:value={type} id="plan-type" disabled={loading} />
      </Column>
      <Column>
        <Button
          type="submit"
          disabled={!isDataValid || loading}
          class="event-submitter"
          size="large"
        >
          Create
        </Button>
      </Column>
    </Grid>
  </form>
</div>

<style lang="scss">
  .CreatePlan {
    margin-top: calc(var(--dodo-ui-space) * 1);

    .decoratedTitle {
      font-family: 'Crimson Pro', serif;
      font-size: 1.5rem;
      margin-top: 0;
      margin-bottom: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
