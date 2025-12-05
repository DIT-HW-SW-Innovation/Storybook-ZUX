<template>
  <button
    :class="[
      'zux-button',
      `zux-button--${variant}`,
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
import { colors } from '../../tokens/colors';
import { dimensions } from '../../tokens/dimensions';
import { motion } from '../../tokens/motion';
import { radii } from '../../tokens/radii';
import { spacing } from '../../tokens/spacing';
import { states } from '../../tokens/states';
import { typography } from '../../tokens/typography';

export interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'primary-small' | 'secondary-small-1' | 'secondary-small-2' | 'secondary-small-3';
  status?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  label: 'Button',
  variant: 'primary',
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
  
  // For dark theme primary, use black overlays as per Figma specs
  const isDarkTheme = props.theme === 'dark';
  const isPrimary = props.variant === 'primary';
  const isSecondary = props.variant === 'secondary';
  const isPrimarySmall = props.variant === 'primary-small';
  const isSecondarySmall1 = props.variant === 'secondary-small-1';
  const isSecondarySmall2 = props.variant === 'secondary-small-2';
  const isSecondarySmall3 = props.variant === 'secondary-small-3';
  const isSmallButton = props.variant === 'primary-small' || 
                        props.variant === 'secondary-small-1' ||
                        props.variant === 'secondary-small-2' ||
                        props.variant === 'secondary-small-3';
  const isFocusedOrPressed = props.status === 'focused' || props.status === 'pressed';
  
  // Secondary (light mode) - Outlined button with white background
  if (isSecondary && props.theme === 'light') {
    const paddingX = isFocusedOrPressed ? '1.25rem' : spacing.large; // 20px vs 24px
    const paddingY = isFocusedOrPressed ? '0.625rem' : spacing.smallMedium; // 10px vs 12px
    
    return {
      '--zux-btn-bg': themeColor.fills.outlineButton, // #ffffff
      '--zux-btn-text': '#333333', // Texts/Button text from Figma
      '--zux-btn-border': themeColor.separator.outlinedButton, // #0000004d (rgba(0, 0, 0, 0.3))
      '--zux-btn-hovered': themeColor.fills.hovered, // #0000001a (rgba(0, 0, 0, 0.1))
      '--zux-btn-focused-pressed': themeColor.fills.focusedPressed, // #00000033 (rgba(0, 0, 0, 0.2))
      '--zux-btn-radius': radii.full,
      '--zux-btn-padding-x': paddingX,
      '--zux-btn-padding-y': paddingY,
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
  }
  
  // Secondary (dark mode) - Outlined button with dark background
  if (isSecondary && props.theme === 'dark') {
    const paddingX = isFocusedOrPressed ? '1.25rem' : spacing.large; // 20px vs 24px
    const paddingY = isFocusedOrPressed ? '0.625rem' : spacing.smallMedium; // 10px vs 12px
    
    return {
      '--zux-btn-bg': '#333333', // Fills/Outline button from Figma
      '--zux-btn-text': '#fafafa', // Texts/Button text from Figma
      '--zux-btn-border': '#ffffff4d', // Separator/Outlined button from Figma (rgba(255, 255, 255, 0.3))
      '--zux-btn-hovered': '#ffffff1a', // Fills/Hovered from Figma (rgba(255, 255, 255, 0.1))
      '--zux-btn-focused-pressed': '#ffffff33', // Fills/Focused&Pressed from Figma (rgba(255, 255, 255, 0.2))
      '--zux-btn-radius': radii.full,
      '--zux-btn-padding-x': paddingX,
      '--zux-btn-padding-y': paddingY,
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
  }
  
  // Small buttons (primary-small and all secondary-small-*) - Fixed height 2rem, stretchable width
  if (isSmallButton) {
    // Small buttons use paddingY: spacing.medium (1rem) as per specification
    const paddingY = spacing.medium; // 1rem
    // All small buttons use paddingX: spacing.medium (1rem / 16px)
    const paddingX = spacing.medium; // 1rem
    
    // Handle primary-small colors
    if (isPrimarySmall) {
      // Primary-small uses theme-based colors
      const bgColor = isDarkTheme ? themeColor.primary.blue : '#538dff'; // Use theme primary blue for dark mode
      const hoveredOverlay = isDarkTheme ? 'rgba(0, 0, 0, 0.1)' : '#ffffff1a'; // Black overlay for dark, white for light
      const focusedPressedOverlay = isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : '#ffffff33'; // Black overlay for dark, white for light
      
      return {
        '--zux-btn-bg': bgColor,
        '--zux-btn-text': themeColor.fills.inverseOnSurface, // #ffffff for both themes
        '--zux-btn-hovered': hoveredOverlay,
        '--zux-btn-focused-pressed': focusedPressedOverlay,
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-1 (light mode) - Specific styling from Figma
    if (isSecondarySmall1 && !isDarkTheme) {
      return {
        '--zux-btn-bg': themeColor.fills.outlineButton, // #ffffff
        '--zux-btn-text': '#333333', // Texts/Button text
        '--zux-btn-border': themeColor.separator.outlinedButton, // #0000004d (rgba(0, 0, 0, 0.3))
        '--zux-btn-hovered': themeColor.fills.hovered, // #0000001a (rgba(0, 0, 0, 0.1))
        '--zux-btn-focused-pressed': themeColor.fills.focusedPressed, // #00000033 (rgba(0, 0, 0, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-1 (dark mode) - Specific styling from Figma
    if (isSecondarySmall1 && isDarkTheme) {
      return {
        '--zux-btn-bg': '#333333', // Fills/Outline button from Figma
        '--zux-btn-text': '#fafafa', // Texts/Button text from Figma
        '--zux-btn-border': '#ffffff4d', // Separator/Outlined button from Figma (rgba(255, 255, 255, 0.3))
        '--zux-btn-hovered': '#ffffff1a', // Fills/Hovered from Figma (rgba(255, 255, 255, 0.1))
        '--zux-btn-focused-pressed': '#ffffff33', // Fills/Focused&Pressed from Figma (rgba(255, 255, 255, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-2 (light mode) - Specific styling from Figma
    if (isSecondarySmall2 && !isDarkTheme) {
      // For enabled state, background is transparent (invisible)
      // For hover/focused/pressed states, overlays will still show via ::after pseudo-element
      const bgColor = props.status === 'enabled' ? 'transparent' : themeColor.backgrounds.inputBox;
      
      return {
        '--zux-btn-bg': bgColor, // Transparent for enabled state, light gray for other states
        '--zux-btn-text': '#333333', // Texts/Button text from Figma
        '--zux-btn-border': 'transparent', // No border for secondary-small-2
        '--zux-btn-hovered': '#0000001a', // Fills/Hovered from Figma (rgba(0, 0, 0, 0.1))
        '--zux-btn-focused-pressed': '#00000033', // Fills/Focused&Pressed from Figma (rgba(0, 0, 0, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-2 (dark mode) - Same as light mode except text and background colors
    if (isSecondarySmall2 && isDarkTheme) {
      // For enabled state, background is transparent (invisible)
      // For hover/focused/pressed states, overlays will still show via ::after pseudo-element
      const bgColor = props.status === 'enabled' ? 'transparent' : themeColor.backgrounds.inputBox;
      
      return {
        '--zux-btn-bg': bgColor, // Transparent for enabled state, dark inputBox background for other states
        '--zux-btn-text': themeColor.texts.primary, // Light text color for dark mode
        '--zux-btn-border': 'transparent', // No border for secondary-small-2
        '--zux-btn-hovered': '#ffffff1a', // White overlay for dark mode (rgba(255, 255, 255, 0.1))
        '--zux-btn-focused-pressed': '#ffffff33', // White overlay for dark mode (rgba(255, 255, 255, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX, // spacing.medium (1rem)
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-3 (light mode) - Same as secondary-small-1 except text color
    if (isSecondarySmall3 && !isDarkTheme) {
      return {
        '--zux-btn-bg': themeColor.fills.outlineButton, // #ffffff
        '--zux-btn-text': themeColor.primary.blue, // Primary colors/Blue (light mode)
        '--zux-btn-border': themeColor.separator.outlinedButton, // #0000004d (rgba(0, 0, 0, 0.3))
        '--zux-btn-hovered': themeColor.fills.hovered, // #0000001a (rgba(0, 0, 0, 0.1))
        '--zux-btn-focused-pressed': themeColor.fills.focusedPressed, // #00000033 (rgba(0, 0, 0, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle secondary-small-3 (dark mode) - Same as secondary-small-1 dark mode except text color
    if (isSecondarySmall3 && isDarkTheme) {
      // Use light mode primary blue for text color (same as light mode)
      const lightModeBlue = colors.light.primary.blue; // #2371ee
      
      return {
        '--zux-btn-bg': '#333333', // Same as secondary-small-1 dark mode
        '--zux-btn-text': lightModeBlue, // Primary colors/Blue (same as light mode)
        '--zux-btn-border': '#ffffff4d', // Same as secondary-small-1 dark mode (rgba(255, 255, 255, 0.3))
        '--zux-btn-hovered': '#ffffff1a', // Same as secondary-small-1 dark mode (rgba(255, 255, 255, 0.1))
        '--zux-btn-focused-pressed': '#ffffff33', // Same as secondary-small-1 dark mode (rgba(255, 255, 255, 0.2))
        '--zux-btn-radius': radii.full,
        '--zux-btn-padding-x': paddingX,
        '--zux-btn-padding-y': paddingY,
        '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
        '--zux-btn-transition-duration': motion.duration.fast,
        '--zux-btn-transition-timing': motion.easing.standard,
        '--zux-btn-focus-ring': themeColor.effects.focusRing,
        '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
        '--zux-btn-disabled-opacity': states.disabled.opacity,
        '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
        '--zux-btn-font-family': typography.rowLabelSmall.family,
        '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
        '--zux-btn-font-weight': typography.rowLabelSmall.weight,
        '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
        '--zux-btn-letter-spacing': '0',
      };
    }
    
    // Handle other secondary-small-* variants (use secondary colors based on theme)
    const isSecondarySmallDark = isDarkTheme;
    return {
      '--zux-btn-bg': isSecondarySmallDark ? '#333333' : themeColor.fills.outlineButton,
      '--zux-btn-text': isSecondarySmallDark ? '#fafafa' : '#333333',
      '--zux-btn-border': isSecondarySmallDark ? '#ffffff4d' : themeColor.separator.outlinedButton,
      '--zux-btn-hovered': isSecondarySmallDark ? '#ffffff1a' : themeColor.fills.hovered,
      '--zux-btn-focused-pressed': isSecondarySmallDark ? '#ffffff33' : themeColor.fills.focusedPressed,
      '--zux-btn-radius': radii.full,
      '--zux-btn-padding-x': paddingX,
      '--zux-btn-padding-y': paddingY,
      '--zux-btn-height': spacing.extraLarge, // 2rem for small buttons
      '--zux-btn-transition-duration': motion.duration.fast,
      '--zux-btn-transition-timing': motion.easing.standard,
      '--zux-btn-focus-ring': themeColor.effects.focusRing,
      '--zux-btn-focus-ring-width': dimensions.button.focusRingWidth,
      '--zux-btn-disabled-opacity': states.disabled.opacity,
      '--zux-btn-disabled-pointer-events': states.disabled.pointerEvents,
      '--zux-btn-font-family': typography.rowLabelSmall.family,
      '--zux-btn-font-size': `${typography.rowLabelSmall.size / 16}rem`,
      '--zux-btn-font-weight': typography.rowLabelSmall.weight,
      '--zux-btn-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
      '--zux-btn-letter-spacing': '0',
    };
  }
  
  // Dark theme primary uses black overlays instead of white
  const hoveredOverlay = isDarkTheme && isPrimary 
    ? 'rgba(0, 0, 0, 0.1)' 
    : themeColor.fills.hovered;
  const focusedPressedOverlay = isDarkTheme && isPrimary 
    ? 'rgba(0, 0, 0, 0.2)' 
    : themeColor.fills.focusedPressed;
  
  // Focused/pressed states use different padding (20px/10px instead of 24px/12px)
  const paddingX = isFocusedOrPressed ? '1.25rem' : spacing.large; // 20px vs 24px
  const paddingY = isFocusedOrPressed ? '0.625rem' : spacing.smallMedium; // 10px vs 12px
  
  return {
    '--zux-btn-bg': themeColor.primary.blue,
    '--zux-btn-text': themeColor.fills.inverseOnSurface,
    '--zux-btn-hovered': hoveredOverlay,
    '--zux-btn-focused-pressed': focusedPressedOverlay,
    '--zux-btn-radius': radii.full,
    '--zux-btn-padding-x': paddingX,
    '--zux-btn-padding-y': paddingY,
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
    opacity var(--zux-btn-transition-duration) var(--zux-btn-transition-timing),
    border-color var(--zux-btn-transition-duration) var(--zux-btn-transition-timing);
  padding: var(--zux-btn-padding-y) var(--zux-btn-padding-x);
  background-color: var(--zux-btn-bg);
  color: var(--zux-btn-text);
  overflow: hidden;
}

/* Large buttons (primary and secondary) - Fixed height and width */
.zux-button--primary,
.zux-button--secondary {
  width: 19rem;
  height: 3rem; /* spacing.xxLarge */
}

/* Small buttons (primary-small and all secondary-small-*) - Fixed height, stretchable width */
.zux-button--primary-small,
.zux-button--secondary-small-1,
.zux-button--secondary-small-2,
.zux-button--secondary-small-3 {
  width: auto;
  height: 2rem; /* spacing.extraLarge */
}

/* Secondary - Outlined button with border */
.zux-button--secondary {
  border: 1px solid var(--zux-btn-border, transparent);
}

/* Small buttons - Typography settings and border */
.zux-button--primary-small,
.zux-button--secondary-small-1,
.zux-button--secondary-small-2,
.zux-button--secondary-small-3 {
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-style: normal;
}

/* Secondary-small-* variants - Outlined button with border */
.zux-button--secondary-small-1,
.zux-button--secondary-small-3 {
  border: 1px solid var(--zux-btn-border, transparent);
}

/* Secondary-small-2 has no border */
.zux-button--secondary-small-2 {
  border: none;
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
  opacity: var(--zux-btn-disabled-opacity); /* 40% opacity as per Figma specs */
  pointer-events: var(--zux-btn-disabled-pointer-events);
}

/* Placeholder for other variants - will be updated from Figma */
/* Variants 2-7 styles will be added based on future Figma designs */
</style>

