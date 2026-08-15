<script lang="ts">
  import { InputEnclosure, UtilityButton, type InputEnclosureProps } from '@flightlesslabs/dodo-ui';
  import Icon from '@iconify/svelte';
  import { Time } from '@internationalized/date';
  import { TimeField, type TimeValue, type WithoutChildrenOrChild } from 'bits-ui';

  type Props = {
    class?: string;
    clearable?: boolean;
    isValid?: boolean;
  };

  let {
    class: className = '',
    value = $bindable(),
    isValid = $bindable(),
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

  function isTime(value: unknown): value is Time {
    return value instanceof Time;
  }

  function validate(time: TimeValue) {
    if (!isTime(value)) {
      return 'Invalid time value';
    }

    return time.hour === 12 ? 'Time cannot be 12:00 PM' : undefined;
  }

  function onInvalid() {
    console.log('debug:', 'invalid');

    isValid = false;
  }

  $effect(() => {
    console.log('debug:', 'value', value);
  });
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
  <TimeField.Root
    bind:value
    {placeholder}
    {...restProps}
    hourCycle={12}
    {disabled}
    {onInvalid}
    {validate}
  >
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

  :global(.TimeInput .dodo-ui-UtilityButton.size--normal.ClearButton) {
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
