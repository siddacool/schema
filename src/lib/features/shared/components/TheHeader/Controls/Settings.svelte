<script lang="ts">
  import { Button } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
</script>

<Button
  aria-label="Settings"
  class="SiteSettingsButton"
  variant="text"
  roundness={1}
  title="Settings"
  href="/settings"
  compact
  color="neutral"
  outline
>
  <Icon icon="material-symbols:settings-outline" />
</Button>

<style lang="scss">
  :global(.dodo-ui-Button.size--normal.SiteSettingsButton) {
    font-size: 1.4rem;
  }
</style>
