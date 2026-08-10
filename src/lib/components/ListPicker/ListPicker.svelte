<script lang="ts" module>
  export type ListPickerOption = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  };

  export type ListPickerProps = {
    class?: string;
    options: ListPickerOption[];
    value: string;
    id?: string;
    disabled?: boolean;
    customLabel?: Snippet<[ListPickerOptionContext]>;
    customDescription?: Snippet<[ListPickerOptionContext]>;
  };
</script>

<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';

  import { RadioGroup } from 'bits-ui';
  import { nanoid } from 'nanoid';
  import Option, { type ListPickerOptionContext } from './Option.svelte';
  import type { Snippet } from 'svelte';

  let {
    class: className = '',
    options,
    value = $bindable(),
    id = nanoid(),
    disabled,
    customLabel,
    customDescription,
  }: ListPickerProps = $props();

  const classes = $derived(['ListPicker', className].filter(Boolean));
</script>

<div class={classes.join(' ')}>
  <RadioGroup.Root bind:value {id} {disabled} class="RadioGroup">
    <Grid gap={1}>
      {#each options as option (option.value)}
        <Column>
          <RadioGroup.Item
            value={option.value}
            id={`id-${option.value}`}
            disabled={option.disabled}
            class="RadioItem"
          >
            {#snippet children({ checked })}
              <Option {...option} {checked} {customLabel} {customDescription} />
            {/snippet}
          </RadioGroup.Item>
        </Column>
      {/each}
    </Grid>
  </RadioGroup.Root>
</div>

<style lang="scss">
  .ListPicker {
    :global(.RadioGroup) {
      display: flex;
      flex-direction: column;
    }

    :global(.RadioItem) {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      border: 0;
      width: 100%;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }
  }
</style>
