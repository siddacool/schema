<script lang="ts">
  import { AccordionTrigger } from '@flightlesslabs/dodo-ui-bits';
  import Icon from '@iconify/svelte';

  type Props = {
    class?: string;
  };

  const { class: className = '' }: Props = $props();

  const classes = $derived(
    [
      'ActivityGroupHeaderTrigger',
      'dodo-ui-UtilityButton',
      'size--normal',
      'color--primary',
      'roundness--1',
      'compact',
      className,
    ].filter(Boolean),
  );
</script>

<AccordionTrigger class={classes.join(' ')}>
  <Icon icon="weui:arrow-filled" />
</AccordionTrigger>

<style lang="scss">
  :global(.ActivityGroupHeaderTrigger.dodo-ui-UtilityButton.size--normal) {
    font-size: 1.5rem;
  }

  :global(.ActivityGroupHeaderTrigger[aria-expanded='true']) {
    rotate: 90deg;
  }
</style>
