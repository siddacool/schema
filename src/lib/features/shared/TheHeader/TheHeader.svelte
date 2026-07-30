<script>
  import Header from '$lib/components/Header/Header.svelte';
  import Controls from './Controls/Controls.svelte';
</script>

<Header>
  {#snippet controls()}
    <Controls />
  {/snippet}
</Header>

<style lang="scss">
</style>
