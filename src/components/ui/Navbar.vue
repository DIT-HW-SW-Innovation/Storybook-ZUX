<template>
  <nav
    :class="[
      'zux-navbar',
      `zux-navbar--${variant}`,
      `zux-navbar--theme-${theme}`,
    ]"
    :style="navbarStyle"
  >
    <slot>
      <!-- Default slot content: 5 NavItemHorizontal or NavItemVertical components -->
      <NavItemHorizontal
        v-if="variant === 'horizontal'"
        v-for="(item, index) in defaultItems"
        :key="index"
        :label="item.label"
        :variant="item.variant"
        :theme="theme"
      />
      <NavItemVertical
        v-if="variant === 'horizontal-small' || variant === 'vertical'"
        v-for="(item, index) in defaultItems"
        :key="index"
        :label="item.label"
        :variant="item.variant"
        :theme="theme"
      />
    </slot>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { spacing } from '../../tokens/spacing';
import NavItemHorizontal from './NavItemHorizontal.vue';
import NavItemVertical from './NavItemVertical.vue';

export interface NavbarProps {
  variant?: 'horizontal' | 'horizontal-small' | 'vertical';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<NavbarProps>(), {
  variant: 'horizontal',
  theme: 'light',
});

// Default items for the horizontal navbar
const defaultItems = [
  { label: 'Home', variant: 'selected' as const },
  { label: 'About', variant: 'unselected' as const },
  { label: 'Services', variant: 'unselected' as const },
  { label: 'Products', variant: 'unselected' as const },
  { label: 'Contact', variant: 'unselected' as const },
];

// Computed styles based on variant
const navbarStyle = computed(() => {
  if (props.variant === 'horizontal') {
    return {
      '--zux-navbar-padding-x': spacing.xxxxLarge, // 4.5rem
    };
  }
  if (props.variant === 'horizontal-small') {
    return {
      '--zux-navbar-padding-x': spacing.medium, // 1rem
    };
  }
  return {};
});
</script>

<style scoped>
.zux-navbar {
  display: flex;
  align-items: center;
}

.zux-navbar--horizontal {
  width: 50rem;
  min-width: 37.5rem;
  padding: 0 var(--zux-navbar-padding-x, 4.5rem);
  justify-content: center;
  flex-direction: row;
}

.zux-navbar--horizontal-small {
  width: 37.4375rem;
  height: 4.5rem;
  max-width: 37.4375rem;
  padding: 0 var(--zux-navbar-padding-x, 1rem);
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.zux-navbar--vertical {
  width: 6.5rem;
  height: 40rem;
  min-height: 25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

