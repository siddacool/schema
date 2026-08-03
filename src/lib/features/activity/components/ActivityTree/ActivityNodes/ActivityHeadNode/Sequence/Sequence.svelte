<script lang="ts">
  import type { ActivityNodeValue } from '../../ActivityNode/ActivityNode.svelte';

  type Props = {
    value: ActivityNodeValue;
  };

  let { value }: Props = $props();

  $effect(() => {
    console.log('debug:', value);
  });
</script>

<div class="Sequence">
  {value.data?.description}
</div>

<style lang="scss">
  .Sequence {
    font-size: 1.1rem;
    font-weight: 400;
    padding-left: calc(var(--dodo-ui-space) / 2);
    margin-bottom: calc(var(--dodo-ui-space) / 2);
  }
</style>
