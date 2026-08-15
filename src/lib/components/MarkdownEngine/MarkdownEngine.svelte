<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown';

  type Props = {
    source: string;
    class?: string;
  };

  const { class: className = '', source }: Props = $props();

  const classes = $derived(['MarkdownEngine', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <SvelteMarkdown {source} class={classes.join(' ')} />
</div>

<style lang="scss">
  .MarkdownEngine {
    color: inherit;
    font-family: inherit;

    :global(p) {
      margin: 0;
    }
  }
</style>
