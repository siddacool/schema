<script lang="ts">
  import type { ActivityTreeNodeValue } from '../../types';

  type Props = {
    class?: string;
    node: ActivityTreeNodeValue;
  };

  const { class: className = '', node }: Props = $props();

  const classes = $derived(['Description', className].filter(Boolean));
</script>

<p class={classes.join(' ')}>
  {node.data?.description}
</p>

<style lang="scss">
  .Description {
    font-family: 'Crimson Pro', serif !important;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 1.1rem;
    font-family: inherit;
    padding: 0;
    border: 0;
    background-color: transparent;
    margin-top: 1px;
    margin-left: 4px;

    @media (min-width: 600px) {
      font-size: 1.2rem;
    }
  }
</style>
