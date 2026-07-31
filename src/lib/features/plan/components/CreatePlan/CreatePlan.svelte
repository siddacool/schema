<script lang="ts">
  import { Button, Column, FormField, Grid, TextInput } from '@flightlesslabs/dodo-ui';
  import { Select, toasts } from '@flightlesslabs/dodo-ui-bits';
  import { planTypeOptions } from '../../config';
  import type { PlanCreateData } from '../../types';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { savePlan } from '../../logic/crud.svelte';

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
    <Grid gap={2}>
      <Column>
        <FormField label="Name:" for="name">
          <TextInput
            placeholder="Enter plan name"
            name="name"
            bind:value={name}
            disabled={loading}
          />
        </FormField>
      </Column>
      <Column>
        <FormField label="Type:" for="type">
          <Select
            placeholder="Select plan type"
            name="type"
            bind:value={type}
            options={planTypeOptions}
            disabled={loading}
          />
        </FormField>
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
  .CreatePlan {
    margin-top: calc(var(--dodo-ui-space) * 2);
  }
</style>
