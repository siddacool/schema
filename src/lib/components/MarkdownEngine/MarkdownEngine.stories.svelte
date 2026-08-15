<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MarkdownEngine from './MarkdownEngine.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: MarkdownEngine,
    tags: ['autodocs'],
  });

  const source = `This is **bold text** and this is *italic text*. [Visit Google](https://www.google.com)`;
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Default" args={{ source }} />
