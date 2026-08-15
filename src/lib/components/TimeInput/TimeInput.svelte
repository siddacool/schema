<script lang="ts">
  import { InputEnclosure, UtilityButton, type InputEnclosureProps } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import { TimeField, type WithoutChildrenOrChild } from 'bits-ui';

  type Props = {
    class?: string;
    clearable?: boolean;
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
    clearable,
    ...restProps
  }: Props & InputEnclosureProps & WithoutChildrenOrChild<TimeField.RootProps> = $props();

  const classes = $derived(['TimeInput', className].filter(Boolean));

  let isFocused = $state(false);

  function handleFocus() {
    isFocused = true;
  }

  function handleBlur() {
    isFocused = false;
  }
</script>

<InputEnclosure
  class={classes.join(' ')}
  {size}
  {roundness}
  {outline}
  {disabled}
  {error}
  affixSpacingBefore="tight"
  focused={isFocused}
>
  <TimeField.Root bind:value {placeholder} {...restProps} hourCycle={12} {disabled}>
    <TimeField.Input class="InputBox" onfocus={handleFocus} onblur={handleBlur}>
      {#snippet children({ segments })}
        {#each segments as { part, value }, i (i)}
          <TimeField.Segment {part}>
            {value}
          </TimeField.Segment>
        {/each}
      {/snippet}
    </TimeField.Input>
  </TimeField.Root>

  {#snippet before()}
    <Icon icon="mingcute:time-line" />
  {/snippet}

  {#snippet after()}
    {#if clearable && value}
      <UtilityButton
        class="ClearButton"
        roundness="full"
        {size}
        compact
        color="primary"
        {disabled}
        onclick={() => (value = undefined)}
      >
        <Icon icon="material-symbols:close" />
      </UtilityButton>
    {/if}
  {/snippet}
</InputEnclosure>

<style lang="scss">
  :global(.TimeInput .InputBox) {
    align-items: center;
    display: flex;
  }

  :global(.ClearButton) {
    font-size: 1.25em;
  }

  :global(.TimeInput [data-segment]) {
    align-items: center;
    height: 80%;
    display: inline-flex;
    padding: 0 calc(var(--dodo-ui-space) / 3);
  }

  :global(.TimeInput [data-segment='literal']) {
    padding: 0;
  }

  :global(.TimeInput .dodo-ui-InputAffix.placement--before) {
    margin: 0 calc(var(--dodo-ui-space) / 2.5);
    width: calc(var(--dodo-ui-element-height-normal) / 1.2);
    font-size: 1.3em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
</style>
