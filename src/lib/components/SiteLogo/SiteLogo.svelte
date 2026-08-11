<script lang="ts">
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  const theme = $derived(useThemeStore.theme);

  type Props = {
    class?: string;
  };

  let { class: className = '' }: Props = $props();

  const classes = $derived(['SiteLogo', `theme--${theme}`, className].filter(Boolean));
</script>

<span class={classes.join(' ')}>
  <img src="/assets/social/logo.svg" alt="logo" />
</span>

<style lang="scss">
  .SiteLogo {
    display: flex;
    flex-direction: column;

    img {
      display: block;
      width: 38px;
      height: auto;
      border-radius: 50%;
    }

    &.theme--light {
      img {
        filter: invert();
      }
    }
  }
</style>
