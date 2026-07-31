<script>
  import Header from '$lib/components/Header/Header.svelte';
  import Controls from './Controls/Controls.svelte';
  import Title from './Title.svelte';
</script>

<Header>
  <Title />
  {#snippet controls()}
    <Controls />
  {/snippet}
</Header>

<style lang="scss">
</style>
