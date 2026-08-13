<script lang="ts">
  import type { ActivityTreeNodeValue } from '../../types';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
    node: ActivityTreeNodeValue;
    onselect: (value: string | undefined) => void;
    editMode: boolean;
  };

  const { class: className = '', node, onselect, editMode }: Props = $props();
  const classes = $derived(['HeaderTrigger', className].filter(Boolean));

  function selectToggle() {
    if (!editMode) {
      return;
    }

    onselect(node.id as string);
  }
</script>

<button class={classes.join(' ')} onclick={selectToggle}>
  <spn class="TriggerIcon">
    <Icon icon="icon-park-outline:dot" />
  </spn>

  <div class="description">{node.data?.description}</div>
</button>

<style lang="scss">
  .HeaderTrigger {
    background-color: transparent;
    border: 0;
    display: flex;
    width: 100%;
    align-items: center;
    padding: var(--dodo-ui-space);
    display: flex;
    align-items: center;
    flex: 1;
    min-height: 40px;
    color: inherit;
    font-family: inherit;

    .description {
      margin: 0;
      margin-left: 4px;
      font-size: 1rem;
      overflow: hidden;

      @media (min-width: 600px) {
        font-size: 1.1rem;
      }
    }

    :global(.TriggerIcon) {
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
    }
  }
</style>
