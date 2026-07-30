<script lang="ts">
  import TheHeader from '$lib/features/shared/TheHeader/TheHeader.svelte';

  let { children } = $props();
</script>

<TheHeader />
{@render children()}
