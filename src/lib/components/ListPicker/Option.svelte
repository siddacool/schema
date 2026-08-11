<script lang="ts" module>
  export interface ListPickerOptionContext extends ListPickerOption {
    checked: boolean;
  }

  export type ListPickerOptionProps = ListPickerOption & {
    checked?: boolean;
    customLabel?: Snippet<[ListPickerOptionContext]>;
    customDescription?: Snippet<[ListPickerOptionContext]>;
  };
</script>

<script lang="ts">
  import type { ListPickerOption } from './ListPicker.svelte';
  import { Card, type CardColor } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  let {
    value,
    label,
    description,
    disabled = false,
    checked = false,
    customLabel,
    customDescription,
  }: ListPickerOptionProps = $props();

  function getColor(disabledvalue: boolean, checkedValue: boolean): CardColor {
    if (disabledvalue) {
      return 'neutral';
    }

    if (checkedValue) {
      return 'primary';
    } else {
      return 'default';
    }
  }

  const classes = $derived(['ListPickerOption', `${checked ? 'selected' : ''}`].filter(Boolean));
  const color = $derived(getColor(disabled, checked));
</script>

<div class={classes.join(' ')}>
  <Card {color} outline class="ListPickerOptionCard" shadow={0} roundness={2}>
    <div class="label">
      {#if customLabel}
        {@render customLabel?.({ value, checked, disabled, label, description })}
      {:else}
        {label}
      {/if}
    </div>

    {#if customDescription}
      <div class="description">
        {@render customDescription?.({ value, checked, disabled, label, description })}
      </div>
    {:else if description}
      <div class="description">
        {description}
      </div>
    {/if}
  </Card>
</div>

<style lang="scss">
  .ListPickerOption {
    font-family: inherit;
    font-size: 1rem;
    color: inherit;

    :global(.ListPickerOptionCard) {
      padding: calc(var(--dodo-ui-space) * 1.8);
      display: flex;
      flex-direction: column;
    }

    .label {
      font-family: 'Archivo', sans-serif;
      font-size: 1.2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 500;
      min-height: 24px;
    }

    .description {
      font-family: 'Crimson Pro', serif;
      font-size: 1.1rem;
      text-align: left;
      margin-top: calc(var(--dodo-ui-space) * 1);
      opacity: 0.8;
      line-height: 1.4;
      letter-spacing: 0.2px;
    }

    .checked {
      font-size: 1.5rem;
      display: inline-flex;
      margin-right: 6px;
      color: var(--dodo-color-primary-600);
    }

    &.selected {
      .label {
        font-variation-settings: 'wdth' 120;
      }
    }
  }
</style>
