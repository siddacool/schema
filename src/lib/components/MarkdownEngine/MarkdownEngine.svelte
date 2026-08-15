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
  <SvelteMarkdown {source} class={classes.join(' ')}>
    {#snippet link({ href, title, children })}
      <a {href} {title} target="_blank" rel="noopener noreferrer">
        {@render children?.()}
      </a>
    {/snippet}
  </SvelteMarkdown>
</div>

<style lang="scss">
  .MarkdownEngine {
    color: inherit;
    font-family: inherit;

    :global(p:first-of-type),
    :global(ul:first-of-type),
    :global(ol:first-of-type) {
      margin-top: 0;
    }

    :global(p:last-of-type),
    :global(ul:last-of-type),
    :global(ol:last-of-type) {
      margin-bottom: 0;
    }

    :global(ul),
    :global(ol) {
      padding-left: calc(var(--dodo-ui-space) * 3);
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      margin-top: 0;
    }

    :global(a) {
      color: var(--dodo-color-primary-700);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
