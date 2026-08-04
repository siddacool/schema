<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    onclick: () => void;
    children?: Snippet;
    class?: string;
  };

  const { class: className = '', children, onclick }: Props = $props();

  const classes = $derived(['ActivityDescription', className].filter(Boolean));

  function handelClick(e: MouseEvent) {
    e.stopPropagation();

    onclick();
  }
</script>

<button class={classes.join(' ')} onclick={handelClick}>
  {@render children?.()}
</button>

<style lang="scss">
  .ActivityDescription {
    font-size: inherit;
    font-family: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: inherit;
    min-height: 28px;
  }
</style>
