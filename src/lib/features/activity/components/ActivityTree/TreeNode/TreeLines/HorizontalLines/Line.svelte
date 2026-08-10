<script lang="ts">
  type Props = {
    line: number;
  };

  let { line }: Props = $props();

  const classes = $derived(['Line'].filter(Boolean));
</script>

<div class={classes.join(' ')} style={`--HorizontalLine-line-no: ${line};`}></div>

<style lang="scss">
  .Line {
    background-color: red;
    width: 1px;
    height: 100%;
    display: flex;
    margin-right: var(--tree-node-indent-per-level);
  }
</style>
