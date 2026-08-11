<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NodeLine from './NodeLine.svelte';

  // ------------------------------
  // Storybook Meta
  // ------------------------------
  const { Story } = defineMeta({
    component: NodeLine,
    tags: ['autodocs'],
  });
</script>

<!-- ------------------------------ -->
<!-- Stories -->
<!-- ------------------------------ -->

<Story name="Horizontal" args={{ position: 'horizontal', width: '8px' }} />

<Story name="Vertical" args={{ position: 'vertical', height: '8px' }} />
