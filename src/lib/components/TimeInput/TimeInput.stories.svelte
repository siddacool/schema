<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TimeInput from './TimeInput.svelte';
  import { Time } from '@internationalized/date';

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

<Story name="Clearable" args={{ clearable: true }} />

<Story name="Min time" args={{ minValue: new Time(9, 0) }} />
