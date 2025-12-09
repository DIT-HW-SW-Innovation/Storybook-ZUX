<template>
  <div
    :class="[
      'zux-nav-item-horizontal',
      `zux-nav-item-horizontal--${effectiveVariant}`,
      `zux-nav-item-horizontal--theme-${theme}`,
    ]"
    :style="itemStyleWithColors"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="zux-nav-item-horizontal__frame">
      <div class="zux-nav-item-horizontal__icon-container">
        <div class="zux-nav-item-horizontal__icon">
          <svg
            class="zux-nav-item-horizontal__icon-shape"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Alarm_inactive.svg for unselected states -->
            <path
              v-if="effectiveVariant.startsWith('unselected')"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.40039 5.20001L6.40039 2.20001L7.60039 3.80001L3.60039 6.80001L2.40039 5.20001ZM19.0004 13C19.0004 16.866 15.8664 20 12.0004 20C8.1344 20 5.00039 16.866 5.00039 13C5.00039 9.13402 8.1344 6.00001 12.0004 6.00001C15.8664 6.00001 19.0004 9.13402 19.0004 13ZM21.0004 13C21.0004 17.9706 16.971 22 12.0004 22C7.02983 22 3.00039 17.9706 3.00039 13C3.00039 8.02945 7.02983 4.00001 12.0004 4.00001C16.971 4.00001 21.0004 8.02945 21.0004 13ZM11.0004 8.00001V12.9998C11.0004 13.2749 11.1114 13.5242 11.2912 13.705L11.0004 12.9998L11.2937 13.7075L14.2933 16.7071L15.7075 15.2929L13.0004 12.5858V8.00001H11.0004ZM17.6004 2.20001L21.6004 5.20001L20.4004 6.80001L16.4004 3.80001L17.6004 2.20001Z"
              fill="var(--zux-nav-item-horizontal-icon-color)"
            />
            <!-- Alarm_active.svg for selected states -->
            <path
              v-else
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.40039 5.19995L6.40039 2.19995L7.60039 3.79995L3.60039 6.79995L2.40039 5.19995ZM12.0004 22C16.971 22 21.0004 17.9705 21.0004 13C21.0004 8.02939 16.971 3.99995 12.0004 3.99995C7.02983 3.99995 3.00039 8.02939 3.00039 13C3.00039 17.9705 7.02983 22 12.0004 22ZM11.0004 7.99995V12.9998C11.0004 13.2748 11.1114 13.5241 11.2912 13.7049L11.0004 12.9998L11.2937 13.7075L14.2933 16.7071L15.7075 15.2928L13.0004 12.5857V7.99995H11.0004ZM17.6004 2.19995L21.6004 5.19995L20.4004 6.79995L16.4004 3.79995L17.6004 2.19995Z"
              fill="var(--zux-nav-item-horizontal-icon-color)"
            />
          </svg>
        </div>
      </div>
      <span class="zux-nav-item-horizontal__label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export interface NavItemHorizontalProps {
  label?: string;
  variant?: 'unselected' | 'unselected-hovered' | 'unselected-pressed' | 'selected' | 'selected-hovered' | 'selected-pressed';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<NavItemHorizontalProps>(), {
  label: 'Label',
  variant: 'unselected',
  theme: 'light',
});

// Interactive state management
const isHovered = ref(false);
const isPressed = ref(false);

// Determine effective variant based on props and interactive state
const effectiveVariant = computed(() => {
  // If variant is explicitly set to a specific state (not just 'unselected'), use it
  if (props.variant !== 'unselected' && props.variant !== 'selected') {
    return props.variant;
  }
  
  // For 'unselected' variant, apply interactive states
  if (props.variant === 'unselected') {
    if (isPressed.value) {
      return 'unselected-pressed';
    }
    if (isHovered.value) {
      return 'unselected-hovered';
    }
    return 'unselected';
  }
  
  // For 'selected' variant, apply interactive states (will be implemented later)
  if (props.variant === 'selected') {
    if (isPressed.value) {
      return 'selected-pressed';
    }
    if (isHovered.value) {
      return 'selected-hovered';
    }
    return 'selected';
  }
  
  return props.variant;
});

const handleMouseEnter = () => {
  if (props.variant === 'unselected' || props.variant === 'selected') {
    isHovered.value = true;
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  isPressed.value = false;
};

const handleMouseDown = () => {
  if (props.variant === 'unselected' || props.variant === 'selected') {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  isPressed.value = false;
};

// Computed token values based on theme
const themeColors = computed(() => colors[props.theme]);
const itemStyle = computed(() => {
  return {
    '--zux-nav-item-horizontal-width': '7.5rem', // 120px
    '--zux-nav-item-horizontal-height': '4rem', // 64px
    '--zux-nav-item-horizontal-padding-x': spacing.small, // 8px
    '--zux-nav-item-horizontal-icon-size': '2rem', // 32px
    '--zux-nav-item-horizontal-icon-radius': radii.full,
    '--zux-nav-item-horizontal-icon-inner-size': '1.5rem', // 24px
    '--zux-nav-item-horizontal-icon-shape-width': '1.2rem', // 19.2px
    '--zux-nav-item-horizontal-icon-shape-height': '1.2375rem', // 19.8px
    '--zux-nav-item-horizontal-icon-shape-x': '0.15rem', // 2.4px
    '--zux-nav-item-horizontal-icon-shape-y': '0.1375rem', // 2.2px
    '--zux-nav-item-horizontal-gap': '0.3125rem', // 5px
    '--zux-nav-item-horizontal-frame-padding-left': '0.25rem', // 4px
    '--zux-nav-item-horizontal-frame-padding-right': '0.75rem', // 12px
    '--zux-nav-item-horizontal-font-family': typography.rowLabelSmall.family,
    '--zux-nav-item-horizontal-font-size': `${typography.rowLabelSmall.size / 16}rem`,
    '--zux-nav-item-horizontal-font-weight': typography.rowLabelSmall.weight,
    '--zux-nav-item-horizontal-line-height': `${typography.rowLabelSmall.lineHeight / 16}rem`,
  };
});

const iconColor = computed(() => {
  // For unselected variant, use Outline-icons-Secondary
  if (effectiveVariant.value.startsWith('unselected')) {
    return themeColors.value.outlineIcons.secondary; // #333333 for light, light color for dark
  }
  // For selected variants, use Primary colors/Blue
  if (effectiveVariant.value.startsWith('selected')) {
    return themeColors.value.primary.blue; // #2371ee for light mode
  }
  return themeColors.value.outlineIcons.secondary;
});

const textColor = computed(() => {
  // For unselected variant, use Texts-Secondary
  if (effectiveVariant.value.startsWith('unselected')) {
    return themeColors.value.texts.secondary;
  }
  // For selected variants, use Primary colors/Blue
  if (effectiveVariant.value.startsWith('selected')) {
    return themeColors.value.primary.blue; // #2371ee for light mode
  }
  return themeColors.value.texts.secondary;
});

const frameBackground = computed(() => {
  // For unselected-hovered, use Fills/Hovered background
  if (effectiveVariant.value === 'unselected-hovered') {
    return themeColors.value.fills.hovered; // rgba(0, 0, 0, 0.10) for light mode
  }
  // For unselected-pressed, use Fills/Focused&Pressed background
  if (effectiveVariant.value === 'unselected-pressed') {
    return themeColors.value.fills.focusedPressed; // rgba(0, 0, 0, 0.20) for light mode
  }
  // For selected-hovered, use Fills/Hovered background
  if (effectiveVariant.value === 'selected-hovered') {
    return themeColors.value.fills.hovered; // rgba(0, 0, 0, 0.10) for light mode
  }
  // For selected-pressed, use Fills/Focused&Pressed background
  if (effectiveVariant.value === 'selected-pressed') {
    return themeColors.value.fills.focusedPressed; // rgba(0, 0, 0, 0.20) for light mode
  }
  // For other variants, transparent
  return 'transparent';
});

// Add icon color to itemStyle for CSS variable
const itemStyleWithColors = computed(() => {
  return {
    ...itemStyle.value,
    '--zux-nav-item-horizontal-icon-color': iconColor.value,
    '--zux-nav-item-horizontal-text-color': textColor.value,
    '--zux-nav-item-horizontal-frame-bg': frameBackground.value,
  };
});
</script>

<style scoped>
.zux-nav-item-horizontal {
  width: var(--zux-nav-item-horizontal-width);
  height: var(--zux-nav-item-horizontal-height);
  padding-left: var(--zux-nav-item-horizontal-padding-x);
  padding-right: var(--zux-nav-item-horizontal-padding-x);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.zux-nav-item-horizontal__frame {
  height: var(--zux-nav-item-horizontal-icon-size);
  padding-left: var(--zux-nav-item-horizontal-frame-padding-left);
  padding-right: var(--zux-nav-item-horizontal-frame-padding-right);
  border-radius: var(--zux-nav-item-horizontal-icon-radius);
  background: var(--zux-nav-item-horizontal-frame-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--zux-nav-item-horizontal-gap);
  transition: background-color 0.15s ease;
}

.zux-nav-item-horizontal__icon-container {
  width: var(--zux-nav-item-horizontal-icon-size);
  height: var(--zux-nav-item-horizontal-icon-size);
  overflow: hidden;
  border-radius: var(--zux-nav-item-horizontal-icon-radius);
  display: flex;
  justify-content: center;
  align-items: center;
}

.zux-nav-item-horizontal__icon {
  width: var(--zux-nav-item-horizontal-icon-inner-size);
  height: var(--zux-nav-item-horizontal-icon-inner-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zux-nav-item-horizontal__icon-shape {
  width: var(--zux-nav-item-horizontal-icon-inner-size);
  height: var(--zux-nav-item-horizontal-icon-inner-size);
}

.zux-nav-item-horizontal__label {
  color: var(--zux-nav-item-horizontal-text-color);
  font-family: var(--zux-nav-item-horizontal-font-family);
  font-size: var(--zux-nav-item-horizontal-font-size);
  font-weight: var(--zux-nav-item-horizontal-font-weight);
  line-height: var(--zux-nav-item-horizontal-line-height);
  word-wrap: break-word;
}
</style>

