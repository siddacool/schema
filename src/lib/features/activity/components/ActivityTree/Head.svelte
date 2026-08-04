<script lang="ts">
  import './ActivityTree.scss';
  import { PlanType } from '$lib/features/plan/types/plan-type';
  import type {
    ActivityTreeOnCreate,
    ActivityTreeOnUpdate,
    ActivityNodeValue,
    ActivityTreeOnDelete,
    ActivityTreeOnSelect,
    ActivityTreeOnInlineEditorShow,
  } from './ActivityTree.svelte';
  import ActivityHeadNode from './PlanTypes/Sequence/ActivityHeadNode/ActivityHeadNode.svelte';

  type Props = {
    planType: PlanType;
    value: ActivityNodeValue;
    oncreate?: ActivityTreeOnCreate;
    onupdate?: ActivityTreeOnUpdate;
    ondelete?: ActivityTreeOnDelete;
    editMode: boolean;
    selectedNode: ActivityNodeValue | undefined;
    onselect: ActivityTreeOnSelect;
    onInlineEditorShow: ActivityTreeOnInlineEditorShow;
    showInlineEditor: boolean;
  };

  const {
    planType,
    value,
    oncreate,
    onupdate,
    ondelete,
    editMode,
    selectedNode,
    onselect,
    onInlineEditorShow,
    showInlineEditor,
  }: Props = $props();
</script>

{#if planType === PlanType.SEQUENCE}
  <ActivityHeadNode
    {value}
    {oncreate}
    {onupdate}
    {ondelete}
    {editMode}
    {selectedNode}
    {onselect}
    {onInlineEditorShow}
    {showInlineEditor}
  />
{:else}
  yo
{/if}
