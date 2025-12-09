<template>
  <button
    :class="[
      'zux-text-button',
      `zux-text-button--${variant}`,
      `zux-text-button--${status}`,
      `zux-text-button--theme-${theme}`,
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
import { colors, rawColors } from '../../tokens/colors';
import { dimensions } from '../../tokens/dimensions';
import { motion } from '../../tokens/motion';
import { radii } from '../../tokens/radii';
import { spacing } from '../../tokens/spacing';
import { states } from '../../tokens/states';
import { typography } from '../../tokens/typography';

export interface TextButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'secondary-small';
  status?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<TextButtonProps>(), {
  label: 'Label',
  variant: 'secondary-small',
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
  const isDarkTheme = props.theme === 'dark';
  const isEnabled = props.status === 'enabled';
  const isHovered = props.status === 'hovered';
  const isFocusedOrPressed = props.status === 'focused' || props.status === 'pressed';
  const isDisabled = props.status === 'disabled';
  const isPrimary = props.variant === 'primary';
  const isSecondary = props.variant === 'secondary';
  const isSecondarySmall = props.variant === 'secondary-small';

  // Base style properties that are common to all variants
  const baseStyle = {
    '--zux-text-btn-radius': radii.full,
    '--zux-text-btn-padding-x': spacing.small,
    '--zux-text-btn-padding-y': spacing.small,
    '--zux-text-btn-transition-duration': motion.duration.fast,
    '--zux-text-btn-transition-timing': motion.easing.standard,
    '--zux-text-btn-focus-ring': themeColor.effects.focusRing,
    '--zux-text-btn-focus-ring-width': dimensions.button.focusRingWidth,
    '--zux-text-btn-disabled-opacity': states.disabled.opacity,
    '--zux-text-btn-disabled-pointer-events': states.disabled.pointerEvents,
    '--zux-text-btn-font-family': typography.rowLabelMedium.family,
    '--zux-text-btn-font-size': `${typography.rowLabelMedium.size / 16}rem`,
    '--zux-text-btn-font-weight': typography.rowLabelMedium.weight,
    '--zux-text-btn-line-height': `${typography.rowLabelMedium.lineHeight / 16}rem`,
    '--zux-text-btn-letter-spacing': '0',
  };

  // PRIMARY VARIANT
  if (isPrimary) {
    // Primary variant uses specific typography
    const primaryTypography = {
      '--zux-text-btn-font-family': typography.rowLabelMedium.family,
      '--zux-text-btn-font-size': '1.125rem', // 18px
      '--zux-text-btn-font-weight': '400',
      '--zux-text-btn-line-height': '1.5625rem', // 25px
      '--zux-text-btn-letter-spacing': '0',
    };

    // Blue text color for primary variant
    const blueText = !isDarkTheme 
      ? (rawColors.lenovoBrandBlue[50] || '#2371ee')
      : (rawColors.lenovoBrandBlue[60] || '#538dff');

    if (isDisabled) {
      // Disabled: transparent background, blue text with 40% transparency
      const disabledBlueText = !isDarkTheme 
        ? 'rgba(35, 113, 238, 0.4)' // #2371ee with 40% opacity
        : 'rgba(83, 141, 255, 0.4)'; // #538dff with 40% opacity
      return {
        ...baseStyle,
        ...primaryTypography,
        '--zux-text-btn-bg': 'transparent',
        '--zux-text-btn-text': disabledBlueText,
        '--zux-text-btn-hovered-bg': themeColor.fills.hovered,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.focusedPressed,
      };
    }

    if (isEnabled) {
      // Enabled: transparent background, blue text
      return {
        ...baseStyle,
        ...primaryTypography,
        '--zux-text-btn-bg': 'transparent',
        '--zux-text-btn-text': blueText,
        '--zux-text-btn-hovered-bg': themeColor.fills.hovered,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.focusedPressed,
      };
    }

    if (isHovered) {
      // Hovered: Fills/Hovered background, blue text
      return {
        ...baseStyle,
        ...primaryTypography,
        '--zux-text-btn-bg': themeColor.fills.hovered,
        '--zux-text-btn-text': blueText,
        '--zux-text-btn-hovered-bg': themeColor.fills.hovered,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.focusedPressed,
      };
    }

    if (isFocusedOrPressed) {
      // Focused/Pressed: Fills/Focused&Pressed background, blue text
      return {
        ...baseStyle,
        ...primaryTypography,
        '--zux-text-btn-bg': themeColor.fills.focusedPressed,
        '--zux-text-btn-text': blueText,
        '--zux-text-btn-hovered-bg': themeColor.fills.hovered,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.focusedPressed,
      };
    }
  }

  // SECONDARY VARIANT
  if (isSecondary) {
    if (!isDarkTheme) {
      // Light mode secondary - similar to primary but different colors (need design spec)
      // For now, using similar styling but with different text color
      if (isDisabled) {
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': themeColor.texts.quaternary,
          '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
          '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
        };
      }
      if (isEnabled) {
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': themeColor.texts.buttonText,
          '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
          '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
        };
      }
      // Hovered/Focused/Pressed
      return {
        ...baseStyle,
        '--zux-text-btn-bg': themeColor.backgrounds.inputBox,
        '--zux-text-btn-text': themeColor.texts.buttonText,
        '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
        '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
      };
    } else {
      // Dark mode secondary
      if (isDisabled) {
        // Disabled: blue text with 40% transparency
        const disabledBlueText = 'rgba(83, 141, 255, 0.4)'; // #538dff with 40% opacity
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': disabledBlueText,
          '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
          '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
        };
      }
      if (isEnabled) {
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': themeColor.texts.primary,
          '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
          '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
        };
      }
      // Hovered/Focused/Pressed
      return {
        ...baseStyle,
        '--zux-text-btn-bg': themeColor.fills.outlineButton,
        '--zux-text-btn-text': themeColor.texts.primary,
        '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
      };
    }
  }

  // SECONDARY-SMALL VARIANT (current implementation)
  if (isSecondarySmall) {
    if (!isDarkTheme) {
      // Light mode secondary-small
      if (isDisabled) {
        // Disabled: blue text with 40% transparency
        const disabledBlueText = 'rgba(35, 113, 238, 0.4)'; // #2371ee with 40% opacity
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': disabledBlueText,
          '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
          '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
        };
      }
      if (isEnabled) {
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': themeColor.texts.buttonText,
          '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
          '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
        };
      }
      // Hovered/Focused/Pressed
      return {
        ...baseStyle,
        '--zux-text-btn-bg': themeColor.backgrounds.inputBox,
        '--zux-text-btn-text': themeColor.texts.buttonText,
        '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
        '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
      };
    } else {
      // Dark mode secondary-small
      if (isDisabled) {
        // Disabled: blue text with 40% transparency
        const disabledBlueText = 'rgba(83, 141, 255, 0.4)'; // #538dff with 40% opacity
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': disabledBlueText,
          '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
          '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
        };
      }
      if (isEnabled) {
        return {
          ...baseStyle,
          '--zux-text-btn-bg': 'transparent',
          '--zux-text-btn-text': themeColor.texts.primary,
          '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
          '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
        };
      }
      // Hovered/Focused/Pressed
      return {
        ...baseStyle,
        '--zux-text-btn-bg': themeColor.fills.outlineButton,
        '--zux-text-btn-text': themeColor.texts.primary,
        '--zux-text-btn-hovered-bg': themeColor.fills.outlineButton,
        '--zux-text-btn-focused-pressed-bg': themeColor.fills.outlineButton,
      };
    }
  }

  // Default fallback
  return {
    ...baseStyle,
    '--zux-text-btn-bg': 'transparent',
    '--zux-text-btn-text': themeColor.texts.buttonText,
    '--zux-text-btn-hovered-bg': themeColor.backgrounds.inputBox,
    '--zux-text-btn-focused-pressed-bg': themeColor.backgrounds.inputBox,
  };
});
</script>

<style scoped>
.zux-text-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--zux-text-btn-radius);
  font-family: var(--zux-text-btn-font-family);
  font-size: var(--zux-text-btn-font-size);
  font-weight: var(--zux-text-btn-font-weight);
  line-height: var(--zux-text-btn-line-height);
  letter-spacing: var(--zux-text-btn-letter-spacing);
  cursor: pointer;
  transition:
    background-color var(--zux-text-btn-transition-duration) var(--zux-text-btn-transition-timing),
    color var(--zux-text-btn-transition-duration) var(--zux-text-btn-transition-timing),
    opacity var(--zux-text-btn-transition-duration) var(--zux-text-btn-transition-timing);
  padding: var(--zux-text-btn-padding-y) var(--zux-text-btn-padding-x);
  background-color: var(--zux-text-btn-bg);
  color: var(--zux-text-btn-text);
  min-height: auto;
  width: auto;
}

.zux-text-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 var(--zux-text-btn-focus-ring-width) var(--zux-text-btn-focus-ring);
}

.zux-text-button:disabled {
  cursor: not-allowed;
}

.zux-text-button:hover:not(:disabled) {
  background-color: var(--zux-text-btn-hovered-bg);
}

.zux-text-button--hovered {
  background-color: var(--zux-text-btn-hovered-bg);
}

.zux-text-button--focused,
.zux-text-button--pressed {
  background-color: var(--zux-text-btn-focused-pressed-bg);
}

.zux-text-button--disabled {
  opacity: var(--zux-text-btn-disabled-opacity);
  pointer-events: var(--zux-text-btn-disabled-pointer-events);
}
</style>
