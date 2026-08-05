<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ListPicker from './ListPicker.svelte';
  import { planTypeOptions } from '$lib/features/plan/config';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: ListPicker,
    tags: ['autodocs'],
    args: {
      options: planTypeOptions,
    },
  });

  let value = $state(planTypeOptions[0].value);
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" asChild>
  <ListPicker options={planTypeOptions} bind:value />
</Story>
