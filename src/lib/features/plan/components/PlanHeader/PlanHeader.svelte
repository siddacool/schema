<script>
  import { Card } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
  import Title from './Title.svelte';
  import BackButton from '$lib/components/BackButton/BackButton.svelte';
</script>

<header class="PlanHeader">
  <Card class="HeaderCard" roundness={0} shadow={3}>
    <BackButton href="/plans" />
    <div class="content">
      <Title />
    </div>

    <div class="controls">
      <Controls />
    </div>
  </Card>
</header>

<style lang="scss">
  .PlanHeader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;

    :global(.HeaderCard) {
      min-height: 60px;
      display: flex;
      align-items: center;
      padding: 0 calc(var(--dodo-ui-space) * 2);
    }

    .content {
      overflow: hidden;
      padding: 0 var(--dodo-ui-space);
      padding-left: 0;
      display: flex;
      align-items: center;
      margin-left: 4px;
    }

    .controls {
      padding-left: var(--dodo-ui-space);
      margin-left: auto;
    }
  }
</style>
