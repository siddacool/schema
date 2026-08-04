<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import CreateActivity from './CreateActivity.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: CreateActivity,
    tags: ['autodocs'],
    args: {
      path: 'act-1.act-2',
    },
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" />
