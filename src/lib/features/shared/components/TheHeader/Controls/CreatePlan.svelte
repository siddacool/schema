<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<Button
  aria-label="Create plan"
  class="TheHeaderCreatePlanButton"
  roundness={1}
  title="Create a plan"
  href="/plans/create"
  compact
  variant="solid"
>
  <Icon icon="material-symbols:add-rounded" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.TheHeaderCreatePlanButton) {
    font-size: 1.8rem;
  }
</style>
