<script lang="ts">
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();
  const classes = $derived(['ListIcon', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Icon icon="icon-park-outline:dot" />
</div>

<style lang="scss">
  .ListIcon {
    font-size: 1rem;
    color: var(--dodo-color-neutral-600);
  }
</style>
