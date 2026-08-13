<script lang="ts">
  type BaseProps = {
    class?: string;
  };

  type HorizontalProps = BaseProps & {
    position: 'horizontal';
    width: string;
    height?: never;
  };

  type VerticalProps = BaseProps & {
    position: 'vertical';
    height: string;
    width?: never;
  };

  type Props = HorizontalProps | VerticalProps;

  let { position, class: className = '', width, height }: Props = $props();

  const classes = $derived(['NodeLine', `position--${position}`, className].filter(Boolean));
</script>

<div
  class={classes.join(' ')}
  style={`--NodeLine-width: ${width ?? 'auto'}; --NodeLine-height: ${height ?? 'auto'}`}
></div>

<style lang="scss">
  .NodeLine {
    background-color: var(--dodo-color-neutral-300);
    display: flex;

    &.position--horizontal {
      height: 1px;
      width: var(--NodeLine-width);
    }

    &.position--vertical {
      width: 1px;
      height: var(--NodeLine-height);
    }
  }
</style>
