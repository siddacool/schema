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

    :global(p:first-of-type) {
      margin-top: 0;
    }

    :global(p:last-of-type) {
      margin-bottom: 0;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      margin-top: 0;
    }
  }
</style>
