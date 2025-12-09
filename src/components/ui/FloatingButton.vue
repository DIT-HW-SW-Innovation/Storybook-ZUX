<template>
  <div
    :class="[
      'zux-floating-button',
      `zux-floating-button--theme-${theme}`,
      enabled ? 'zux-floating-button--enabled' : 'zux-floating-button--disabled',
    ]"
    :style="containerStyle"
  >
    <button
      :class="[
        'zux-floating-button__circle',
        { 'zux-floating-button__circle--hovered': isHovered },
        { 'zux-floating-button__circle--focused': isFocused },
        { 'zux-floating-button__circle--pressed': isPressed },
      ]"
      :style="circleStyle"
      :disabled="!enabled"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      aria-label="Create new content"
    >
      <div class="zux-floating-button__icon">
        <svg
          class="zux-floating-button__icon-shape"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.2079 22.906L24.5363 9.57755C25.4215 8.69236 25.4215 7.25719 24.5363 6.372C23.6511 5.48681 22.2159 5.48681 21.3307 6.37199L8.00232 19.7004L5.94804 24.9602L11.2079 22.906ZM26.2333 4.67494C24.4109 2.8525 21.4561 2.85249 19.6337 4.67494L6.14724 18.1614C6.01696 18.2916 5.9151 18.4475 5.84807 18.6191L2.82707 26.3542C2.40438 27.4364 3.47185 28.5039 4.55411 28.0812L12.2892 25.0602C12.4608 24.9932 12.6166 24.8913 12.7469 24.761L26.2333 11.2746C28.0558 9.45216 28.0558 6.49739 26.2333 4.67494ZM21.4666 25.3335H17.3332V22.9335H21.4666V18.6668H23.8666V22.9335H27.9999V25.3335H23.8666V29.3335L21.4666 29.3335V25.3335Z"
            fill="white"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { colors, rawColors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';
import { motion } from '../../tokens/motion';
import { states } from '../../tokens/states';

export interface FloatingButtonProps {
  /** Is the button enabled */
  enabled?: boolean;
  /** Theme variant */
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<FloatingButtonProps>(), {
  enabled: true,
  theme: 'light',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const isHovered = ref(false);
const isFocused = ref(false);
const isPressed = ref(false);

// Get theme colors
const themeColors = computed(() => colors[props.theme]);

// Container styles
const containerStyle = computed(() => {
  return {
    '--zux-floating-button-padding': '0.5625rem', // 9px
    '--zux-floating-button-width': '5.75rem', // 92px
    '--zux-floating-button-height': '5.75rem', // 92px
  };
});

// Circle button styles based on state and theme
const circleStyle = computed(() => {
  const themeColor = themeColors.value;
  const isDarkTheme = props.theme === 'dark';

  // Base colors from tokens
  // Light mode enabled: lenovoYellow[75] = #e0b400 (via themeColor.primary.yellow)
  // Dark mode enabled: lenovoYellow[60] = #b08d00 (via themeColor.primary.yellow)
  // Hover: lenovoYellow[65] = #bf9900 (same for both themes)
  // Focus/Active: lenovoYellow[60] = #b08d00 (same for both themes)
  const enabledBg = themeColor.primary.yellow; // Already switches based on theme
  const hoverBg = rawColors.lenovoYellow[65]; // #bf9900 - hover state for both themes
  const focusActiveBg = rawColors.lenovoYellow[60]; // #b08d00 - focus/active state for both themes

  let backgroundColor = enabledBg;
  
  if (!props.enabled) {
    // Disabled state: same background but with opacity
    backgroundColor = enabledBg;
  } else if (isPressed.value || isFocused.value) {
    // Focused or pressed state
    backgroundColor = focusActiveBg;
  } else if (isHovered.value) {
    // Hovered state
    backgroundColor = hoverBg;
  }

  return {
    backgroundColor: backgroundColor,
    '--zux-floating-button-bg': backgroundColor,
    '--zux-floating-button-size': '4.625rem', // 74px
    '--zux-floating-button-radius': radii.full,
    '--zux-floating-button-transition': `background ${motion.duration.fast} ${motion.easing.standard}`,
    '--zux-floating-button-disabled-opacity': props.enabled ? '1' : states.disabled.opacity,
    '--zux-floating-button-disabled-cursor': props.enabled ? 'pointer' : 'not-allowed',
  };
});

const handleClick = (event: MouseEvent) => {
  if (props.enabled) {
    emit('click', event);
  }
};

const handleMouseEnter = () => {
  if (props.enabled) {
    isHovered.value = true;
  }
};

const handleMouseLeave = () => {
  isHovered.value = false;
  isPressed.value = false;
};

const handleFocus = () => {
  if (props.enabled) {
    isFocused.value = true;
  }
};

const handleBlur = () => {
  isFocused.value = false;
};

const handleMouseDown = () => {
  if (props.enabled) {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  isPressed.value = false;
};
</script>

<style scoped>
.zux-floating-button {
  display: inline-flex;
  padding: var(--zux-floating-button-padding, 0.5625rem);
  align-items: center;
  justify-content: center;
  width: var(--zux-floating-button-width, 5.75rem);
  height: var(--zux-floating-button-height, 5.75rem);
}

.zux-floating-button__circle {
  display: flex;
  width: var(--zux-floating-button-size, 4.625rem);
  height: var(--zux-floating-button-size, 4.625rem);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3125rem; /* 5px */
  border-radius: var(--zux-floating-button-radius);
  position: relative;
  cursor: var(--zux-floating-button-disabled-cursor, pointer);
  transition: var(--zux-floating-button-transition);
  border: none;
  padding: 0;
  font: inherit;
  background-color: var(--zux-floating-button-bg);
  opacity: var(--zux-floating-button-disabled-opacity, 1);
}

.zux-floating-button__circle:focus {
  outline: none;
}

.zux-floating-button__icon {
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  flex-shrink: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zux-floating-button__icon-shape {
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  flex-shrink: 0;
  fill: white;
}
</style>
