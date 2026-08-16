<script lang="ts">
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();
  const classes = $derived(['Track', className].filter(Boolean));
</script>

<span class={classes.join(' ')}>
  <Icon icon="tabler:clock" />
</span>

<style lang="scss">
  .Track {
    color: var(--dodo-color-primary-500);
    margin-left: var(--dodo-ui-space);
    font-size: 1.3rem;
  }
</style>
