<script lang="ts">
  import type {
    ActivityNodeValue,
    ActivityTreeOnCreate,
    ActivityTreeOnInlineEditorShow,
    ActivityTreeOnSelect,
  } from '../../ActivityTree.svelte';
  import type { Snippet } from 'svelte';
  import ActivityDescription from './ActivityDescription.svelte';
  import { Column, Grid } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';

  type Props = {
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    class?: string;
    children?: Snippet;
    allowCreate: boolean;
  };

  const {
    value,
    oncreate,
    editMode,
    selectedNode,
    onselect,
    onInlineEditorShow,
    class: className = '',
    children,
    allowCreate,
  }: Props = $props();

  const classes = $derived(['DisplayCard', className].filter(Boolean));
  let showControls = $derived(selectedNode?.id === value.id);

  function displayEditor() {
    onInlineEditorShow(value);
  }
</script>

<div class={classes.join(' ')}>
  <Grid>
    <Column>
      <ActivityDescription onclick={() => onselect(value)}>
        {@render children?.()}
      </ActivityDescription>
    </Column>

    {#if editMode && showControls}
      <Column>
        <Controls {oncreate} {value} {displayEditor} {allowCreate} {onselect} />
      </Column>
      <Column></Column>
    {/if}
  </Grid>
</div>
