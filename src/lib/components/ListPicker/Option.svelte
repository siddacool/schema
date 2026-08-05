<script lang="ts" module>
  export type ListPickerOptionProps = ListPickerOption & {
    checked?: boolean;
  };
</script>

<script lang="ts">
  import Icon from '@iconify/svelte';

  import type { ListPickerOption } from './ListPicker.svelte';
  import { Card, type CardColor } from '@flightlesslabs/dodo-ui';

  let { label, description, disabled = false, checked = false }: ListPickerOptionProps = $props();

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

  const classes = $derived(['ListPickerOption'].filter(Boolean));
  const color = $derived(getColor(disabled, checked));
</script>

<div class={classes.join(' ')}>
  <Card {color} outline class="ListPickerOptionCard" shadow={0} roundness={2}>
    <div class="label">
      {#if checked}
        <span class="checked">
          <Icon icon="material-symbols:check-circle-outline-rounded" />
        </span>
      {/if}

      {label}
    </div>

    {#if description}
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
      padding: calc(var(--dodo-ui-space) * 2);
      display: flex;
      flex-direction: column;
    }

    .label {
      font-size: 1.1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: 500;
      min-height: 24px;
    }

    .description {
      font-size: 1rem;
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
    }
  }
</style>
