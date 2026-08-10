<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    onclick?: () => void;
    preventAdd?: boolean;
    title?: string;
  };

  const {
    class: className = '',
    onclick,
    preventAdd = false,
    title = 'Add new activity',
  }: Props = $props();

  const classes = $derived(['BaseAddButton', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <Button
    aria-label={title}
    class="AddActivityButton"
    roundness={1}
    {title}
    compact
    color={preventAdd ? 'neutral' : 'primary'}
    {onclick}
    variant="solid"
  >
    <Icon icon="material-symbols:add-rounded" />
  </Button>
</div>

<style lang="scss">
  .BaseAddButton {
    :global(.dodo-ui-Button.size--normal.AddActivityButton) {
      font-size: 1.8rem;
    }
  }
</style>
