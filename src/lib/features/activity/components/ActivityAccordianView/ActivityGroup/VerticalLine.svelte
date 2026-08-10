<script lang="ts">
  const classes = $derived(['VerticalLine'].filter(Boolean));
</script>

<div class={classes.join(' ')}></div>

<style lang="scss">
  .VerticalLine {
    background-color: var(--dodo-color-neutral-300);
    width: 1px;
    height: calc(var(--dodo-ui-space) * 1.5);
    display: flex;
    position: relative;
    left: 8px;
  }
</style>
