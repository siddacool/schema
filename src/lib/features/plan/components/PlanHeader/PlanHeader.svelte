<script>
  import { Card } from '@flightlesslabs/dodo-ui';
  import Controls from './Controls/Controls.svelte';
  import Title from './Title.svelte';
  import Back from './Back.svelte';
</script>

<header class="PlanHeader">
  <Card class="HeaderCard" roundness={0} shadow={3}>
    <Back />
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
      min-height: 55px;
      display: flex;
      align-items: center;
      padding: 0 var(--dodo-ui-space);
      padding-left: calc(var(--dodo-ui-space) * 0.5);
    }

    .content {
      overflow: hidden;
      padding: 0 var(--dodo-ui-space);
      padding-left: 0;
      display: flex;
      align-items: center;
      margin-left: 2px;
    }

    .controls {
      padding-left: var(--dodo-ui-space);
      margin-left: auto;
    }
  }
</style>
