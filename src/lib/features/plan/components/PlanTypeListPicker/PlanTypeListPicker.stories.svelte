<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import PlanTypeListPicker from './PlanTypeListPicker.svelte';
  import { planTypeOptions } from '$lib/features/plan/config';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: PlanTypeListPicker,
    tags: ['autodocs'],
  });

  let value = $state(planTypeOptions[0].value);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" asChild>
  <PlanTypeListPicker bind:value />
</Story>
