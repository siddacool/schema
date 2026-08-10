<script lang="ts">
  const classes = $derived(['Line'].filter(Boolean));
</script>

<div class={classes.join(' ')}></div>

<style lang="scss">
  .Line {
    background-color: var(--dodo-color-neutral-300);
    width: 1px;
    height: 100%;
    display: flex;
    margin-right: var(--tree-node-indent-per-level);
  }
</style>
