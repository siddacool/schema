<script lang="ts">
  import { Grid } from '@flightlesslabs/dodo-ui';
  import UserInterface from './UserInterface/UserInterface.svelte';
</script>

<div class="SettingsCard">
  <Grid gap={2}>
    <UserInterface />
  </Grid>
</div>

<style lang="scss">
  .SettingsCard {
    margin-top: calc(var(--dodo-ui-space) * 2);

    :global(.SettingsCardCard) {
      padding: calc(var(--dodo-ui-space) * 2);
    }
  }
</style>
