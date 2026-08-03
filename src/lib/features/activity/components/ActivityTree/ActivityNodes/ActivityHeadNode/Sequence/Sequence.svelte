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

<div>
  {value.data?.description}
</div>

<style lang="scss">
</style>
