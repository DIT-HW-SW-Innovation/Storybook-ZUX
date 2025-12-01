<template>
  <button
    :class="[
      'zux-button',
      `zux-button--variant-${variant}`,
      `zux-button--${status}`,
      `zux-button--theme-${theme}`,
    ]"
    :style="buttonStyle"
    :disabled="status === 'disabled'"
    @click="$emit('click', $event)"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { colors } from '../tokens/colors';
import { dimensions } from '../tokens/dimensions';
import { motion } from '../tokens/motion';
import { radii } from '../tokens/radii';
import { spacing } from '../tokens/spacing';
import { states } from '../tokens/states';
import { typography } from '../tokens/typography';

export interface ButtonProps {
  label?: string;
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  status?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Button',
  variant: 1,
  status: 'enabled',
  theme: 'light',
});

defineEmits<{
  click: [event: MouseEvent];
  mouseenter: [event: MouseEvent];
  mouseleave: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// Computed token values based on theme
const themeColors = computed(() => colors[props.theme]);
const buttonStyle = computed(() => {
  const themeColor = themeColors.value;
  const letterSpacing = typography.rowLabelXtraLarge.letterSpacing ?? 0;
  return {
    '--zux-btn-bg': themeColor.primary.blue,
    '--zux-btn-text': themeColor.fills.inverseOnSurface,
    '--zux-btn-hovered': themeColor.fills.hovered,
    '--zux-btn-focused-pressed': themeColor.fills.focusedPressed,
    '--zux-btn-radius': radii.full,
    '--zux-btn-padding-x': spacing.large,
    '--zux-btn-padding-y': spacing.smallMedium,
    '--zux-btn-min-height': dimensions.button.minHeight,
    '--zux-btn-min-width': dimensions.button.minWidth,
    '--zux-btn-transition-duration': motion.duration.fast,
    '--zux-btn-transition-timing': motion.easing.standard,
    '--zux-btn-focus-ring': themeColor.effects.focusRing,
    '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
    '--zux-btn-disabled-opacity': states.disabled.opacity,
    '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
    '--zux-btn-font-family': typography.rowLabelXtraLarge.family,
    '--zux-btn-font-size': `${typography.rowLabelXtraLarge.size / 16}rem`,
    '--zux-btn-font-weight': typography.rowLabelXtraLarge.weight,
    '--zux-btn-line-height': `${typography.rowLabelXtraLarge.lineHeight / 16}rem`,
    '--zux-btn-letter-spacing': `${letterSpacing / 16}rem`,
  };
});
</script>

<style scoped>
.zux-button {
  position: relative;
  display: flex;
  width: 19rem;
  height: 3rem;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--zux-btn-radius);
  font-family: var(--zux-btn-font-family);
  font-size: var(--zux-btn-font-size);
  font-weight: var(--zux-btn-font-weight);
  line-height: var(--zux-btn-line-height);
  letter-spacing: var(--zux-btn-letter-spacing);
  cursor: pointer;
  transition:
    background-color var(--zux-btn-transition-duration) var(--zux-btn-transition-timing),
    box-shadow var(--zux-btn-transition-duration) var(--zux-btn-transition-timing),
    color var(--zux-btn-transition-duration) var(--zux-btn-transition-timing),
    opacity var(--zux-btn-transition-duration) var(--zux-btn-transition-timing);
  padding: var(--zux-btn-padding-y) var(--zux-btn-padding-x);
  background-color: var(--zux-btn-bg);
  color: var(--zux-btn-text);
  overflow: hidden;
}

.zux-button::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: transparent;
  transition: background-color var(--zux-btn-transition-duration) var(--zux-btn-transition-timing);
  pointer-events: none;
}

.zux-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--zux-btn-focus-ring-width) var(--zux-btn-focus-ring);
}

.zux-button:disabled {
  cursor: not-allowed;
}

/* Variant 1 - Light Theme */
/* Colors are set via inline styles from tokens */

.zux-button:hover:not(:disabled)::after {
  background-color: var(--zux-btn-hovered);
}

.zux-button--hovered::after {
  background-color: var(--zux-btn-hovered);
}

.zux-button--focused::after,
.zux-button--pressed::after {
  background-color: var(--zux-btn-focused-pressed);
}

.zux-button--disabled {
  opacity: var(--zux-btn-disabled-opacity);
  pointer-events: var(--zux-btn-disabled-pointer-events);
}

/* Placeholder for other variants - will be updated from Figma */
/* Variants 2-7 styles will be added based on future Figma designs */
</style>

