<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<div class="Back">
  <Button
    href="/plans"
    class="BackButton"
    variant="text"
    aria-label="Back button"
    background="none"
    compact
    roundness="full"
    color="neutral"
    size="small"
  >
    <Icon icon="ic:twotone-arrow-back" />
  </Button>
</div>

<style lang="scss">
  .Back {
    display: inline-flex;

    :global(.BackButton) {
      font-size: 1.5rem;
    }
  }
</style>
