<script lang="ts">
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import type {
    ActivityNodeValue,
    ActivityTreeOnDelete,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
  } from '../../ActivityTree.svelte';
  import type { Snippet } from 'svelte';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    onupdateMod?: () => Promise<void>;
    ondelete?: ActivityTreeOnDelete;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    class?: string;
    children?: Snippet;
    loading: boolean;
  };

  const {
    value,
    onupdateMod,
    ondelete,
    onselect,
    onInlineEditorShow,
    class: className = '',
    children,
    loading,
  }: Props = $props();

  const classes = $derived(['EditCard', className].filter(Boolean));

  function onclose() {
    onInlineEditorShow(value);
    onselect(undefined);
  }

  function onclear(e: MouseEvent) {
    e.stopPropagation();
    onclose();
  }

  async function submit(e: MouseEvent) {
    e.stopPropagation();

    if (onupdateMod) {
      await onupdateMod();
    }
    onclose();
  }
</script>

<div class={classes.join(' ')}>
  <Grid>
    <Column>
      {@render children?.()}
    </Column>
    <Column>
      <Controls {onclear} onsubmit={submit} disabled={loading} {ondelete} {value} />
    </Column>
  </Grid>
</div>
