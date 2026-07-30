<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Header from './Header.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: Header,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default"></Story>
