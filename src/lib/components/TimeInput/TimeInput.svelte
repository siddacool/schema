<script lang="ts">
  import { InputEnclosure, type InputEnclosureProps } from '@flightlesslabs/dodo-ui';
  import { TimeField, type WithoutChildrenOrChild } from 'bits-ui';

  type Props = {
    class?: string;
  };

  let {
    class: className = '',
    value = $bindable(),
    placeholder,
    size,
    roundness,
    outline,
    disabled,
    error,
    before,
    after,
    ...restProps
  }: Props & InputEnclosureProps & WithoutChildrenOrChild<TimeField.RootProps> = $props();

  const classes = $derived(['TimeInput', className].filter(Boolean));
</script>

<InputEnclosure
  class={classes.join(' ')}
  {size}
  {roundness}
  {outline}
  {disabled}
  {error}
  {before}
  {after}
>
  <TimeField.Root bind:value {placeholder} {...restProps} hourCycle={12} {disabled}>
    <TimeField.Input class="InputBox">
      {#snippet children({ segments })}
        {#each segments as { part, value }, i (i)}
          <TimeField.Segment {part}>
            {value}
          </TimeField.Segment>
        {/each}
      {/snippet}
    </TimeField.Input>
  </TimeField.Root>
</InputEnclosure>

<style lang="scss">
  :global(.TimeInput .InputBox) {
    align-items: center;
    display: flex;
  }

  :global(.TimeInput [data-segment='minute']) {
    margin-right: calc(var(--dodo-ui-space) / 2);
  }
</style>
