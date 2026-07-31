<script lang="ts">
  import { resolve } from '$app/paths';
  import { useThemeStore } from '@flightlesslabs/dodo-ui';

  const theme = $derived(useThemeStore.theme);

  const classes = $derived(['Logo', `theme--${theme}`].filter(Boolean));
</script>

<a href={resolve('/plans')} class={classes.join(' ')}>
  <img src="/assets/social/logo.svg" alt="logo" />
</a>

<style lang="scss">
  .Logo {
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
