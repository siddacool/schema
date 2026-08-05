<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import DayPicker from './DayPicker.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: DayPicker,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
