<script lang="ts">
  import { Card } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';
  import Logo from './Logo.svelte';

  type Props = {
    children?: Snippet;
    class?: string;
    controls?: Snippet;
  };

  let { children, controls, class: className = '' }: Props = $props();

  const classes = $derived(['Header', className].filter(Boolean));
</script>

<header class={classes.join(' ')}>
  <Card class="HeaderCard" roundness={0} shadow={3}>
    <Logo />
    <div class="content">
      {@render children?.()}
    </div>

    {#if controls}
      <div class="controls">
        {@render controls?.()}
      </div>
    {/if}
  </Card>
</header>

<style lang="scss">
  .Header {
    :global(.HeaderCard) {
      min-height: 60px;
      display: flex;
      align-items: center;
      padding: 0 calc(var(--dodo-ui-space) * 2);
    }

    .content {
      padding: 0 var(--dodo-ui-space);

      &:empty {
        display: none;
      }
    }

    .controls {
      padding-left: var(--dodo-ui-space);
      margin-left: auto;

      &:empty {
        display: none;
      }
    }
  }
</style>
