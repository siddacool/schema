<script lang="ts">
  import { Card, useThemeStore } from '@flightlesslabs/dodo-ui';
  import type { Snippet } from 'svelte';

  type Props = {
    class?: string;
    expanded?: boolean;
    branch?: boolean;
    children?: Snippet;
  };

  const { class: className = '', expanded = false, branch = false, children }: Props = $props();

  const theme = $derived(useThemeStore.theme);
  const classes = $derived(
    [
      'BaseNodeContainer',
      `theme--${theme}`,
      `${expanded ? 'expanded' : ''}`,
      `${branch ? 'branch' : ''}`,
      className,
    ].filter(Boolean),
  );

  function onclick(e: MouseEvent) {
    e.stopPropagation();
  }

  function onkeydown(e: KeyboardEvent) {
    e.stopPropagation();
  }
</script>

<div class={classes.join(' ')} {onclick} {onkeydown} role="presentation">
  <Card class="TreeNodeCard" shadow={0}>
    {@render children?.()}
  </Card>
</div>

<style lang="scss">
  .BaseNodeContainer {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    z-index: 1;

    :global(.TreeNodeCard) {
      display: flex;
      align-items: center;
      width: 100%;
      transition:
        background-color 100ms,
        color 100ms;
      background-color: var(--dodo-color-white);

      &:hover {
        background-color: var(--dodo-color-primary-100);
      }
    }

    &.expanded {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-100);

        &:hover {
          background-color: var(--dodo-color-primary-200);
        }
      }

      &.branch {
        :global(.TreeNodeCard) {
          background-color: var(--dodo-color-neutral-200);

          &:hover {
            background-color: var(--dodo-color-primary-200);
          }
        }
      }
    }

    &.theme--dark {
      :global(.TreeNodeCard) {
        background-color: var(--dodo-color-neutral-50);

        &:hover {
          background-color: var(--dodo-color-primary-50);
        }
      }

      &.expanded {
        :global(.TreeNodeCard) {
          background-color: var(--dodo-color-neutral-100);

          &:hover {
            background-color: var(--dodo-color-primary-100);
          }
        }

        &.branch {
          :global(.TreeNodeCard) {
            background-color: var(--dodo-color-neutral-200);

            &:hover {
              background-color: var(--dodo-color-primary-100);
            }
          }
        }
      }
    }
  }
</style>
