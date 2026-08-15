<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimeInput from './TimeInput.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: TimeInput,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
