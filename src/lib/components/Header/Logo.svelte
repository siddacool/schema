<script lang="ts">
  import { resolve } from '$app/paths';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';
  import SiteLogo from '../SiteLogo/SiteLogo.svelte';

  const theme = $derived(useThemeStore.theme);

  type Props = {
    class?: string;
  };

  let { class: className = '' }: Props = $props();

  const classes = $derived(['Logo', `theme--${theme}`, className].filter(Boolean));
</script>

<a href={resolve('/plans')} class={classes.join(' ')}>
  <SiteLogo />
</a>

<style lang="scss">
  .Logo {
    display: flex;
    flex-direction: column;
  }
</style>
