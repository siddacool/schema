<script lang="ts">
  import SvelteMarkdown, { defaultRenderers, excludeHtmlOnly } from '@humanspeak/svelte-markdown';

  type Props = {
    source: string;
    class?: string;
  };

  const { class: className = '', source }: Props = $props();

  const classes = $derived(['MarkdownEngine', className].filter(Boolean));

  const renderers = {
    ...defaultRenderers,
    html: excludeHtmlOnly(['li', 'ul']),
  };
</script>

<div class={classes.join(' ')}>
  <SvelteMarkdown {source} class={classes.join(' ')} {renderers}>
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

    :global(a) {
      color: var(--dodo-color-primary-700);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
