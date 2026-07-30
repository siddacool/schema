<script lang="ts">
  import Box from '$lib/components/Box/Box.svelte';
  import TheHeader from '$lib/features/shared/TheHeader/TheHeader.svelte';

  let { children } = $props();
</script>

<TheHeader />

<Box>
  <div class="container">
    {@render children()}
  </div>
</Box>

<style lang="scss">
  .container {
    padding: calc(var(--dodo-ui-space) * 3) 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
