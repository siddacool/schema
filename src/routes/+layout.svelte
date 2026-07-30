<script lang="ts">
  import '@flightlesslabs/dodo-ui/styles/global/index.scss';
  import '@flightlesslabs/dodo-ui/styles/components.scss';
  // Addon (dodo-ui-bits)
  import '@flightlesslabs/dodo-ui-bits/styles/main.scss';
  // Addon (dodo-ui-date)
  import '@flightlesslabs/dodo-ui-date/styles/main.scss';

  import { ModalManager, ToastManager } from '@flightlesslabs/dodo-ui-bits';
  import { Theme } from '@flightlesslabs/dodo-ui';
  import ThemeSetter from '$lib/features/settings/components/SettingsCard/ThemeSetter.svelte';
  import '$lib/styles/dodo-ui-customized.scss';

  let { children } = $props();
</script>

<ThemeSetter />
<Theme global class="Theme" type="auto">
  <div class="App">
    {@render children()}
  </div>

  <ToastManager clearAfterDuration={3000} alignmentY="bottom" alignmentX="center" limit={3} />
  <ModalManager />
</Theme>

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    font-family: 'Archivo', sans-serif;
    font-optical-sizing: auto;
    font-size: 16px;
  }

  :global(body) {
    margin: 0;
    height: 100vh;
    overflow: hidden;
  }

  :global(.Theme) {
    height: 100vh;
    overflow: hidden;
  }

  .App {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    background-color: var(--dodo-color-white);
    color: var(--dodo-color-neutral-800);
  }

  :global(.dodo-theme--dark) {
    color-scheme: dark;
  }

  :global(.dodo-theme--dark .App) {
    background-color: var(--dodo-color-neutral-50);
  }
</style>
