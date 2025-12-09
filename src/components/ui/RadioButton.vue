<template>
  <div
    :class="[
      'zux-radio-button',
      `zux-radio-button--${checked ? 'selected' : 'unselected'}`,
      `zux-radio-button--${status}`,
      `zux-radio-button--theme-${theme}`,
    ]"
    :style="radioButtonStyle"
  >
    <div class="zux-radio-button__frame">
      <button
        class="zux-radio-button__button"
        :disabled="status === 'disabled'"
        :aria-checked="checked"
        :aria-disabled="status === 'disabled'"
        role="radio"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      >
        <div class="zux-radio-button__bounding-box">
          <div
            v-if="effectiveStatus === 'hovered' || effectiveStatus === 'focused' || effectiveStatus === 'pressed'"
            class="zux-radio-button__background-ellipse"
            :style="backgroundEllipseStyle"
          ></div>
          <div class="zux-radio-button__shape"></div>
          <svg
            v-if="checked"
            class="zux-radio-button__radio-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              fill="var(--zux-radio-button-icon-fill, #008758)"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';
import { states } from '../../tokens/states';

export interface RadioButtonProps {
  checked?: boolean;
  status?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<RadioButtonProps>(), {
  checked: false,
  status: 'enabled',
  theme: 'light',
});

const emit = defineEmits<{
  'update:checked': [value: boolean];
  click: [event: MouseEvent];
  mouseenter: [event: MouseEvent];
  mouseleave: [event: MouseEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

// Interactive state management (only used when status is 'enabled')
const isHovered = ref(false);
const isFocused = ref(false);
const isPressed = ref(false);

// Determine effective status based on props and interactive state
const effectiveStatus = computed(() => {
  // If status is explicitly set to a specific state (not 'enabled'), use it
  if (props.status !== 'enabled') {
    return props.status;
  }
  
  // For 'enabled' status, apply interactive states
  if (isPressed.value) {
    return 'pressed';
  }
  if (isFocused.value) {
    return 'focused';
  }
  if (isHovered.value) {
    return 'hovered';
  }
  return 'enabled';
});

// Watch for when radio button becomes selected and immediately clear pressed state
watch(() => props.checked, (newValue) => {
  if (newValue === true) {
    // Immediately clear pressed state when radio button becomes selected
    isPressed.value = false;
  }
});

const handleClick = (event: MouseEvent) => {
  if (props.status === 'disabled') {
    return;
  }
  emit('update:checked', !props.checked);
  emit('click', event);
};

const handleMouseEnter = () => {
  if (props.status === 'enabled') {
    isHovered.value = true;
  }
  emit('mouseenter', new MouseEvent('mouseenter'));
};

const handleMouseLeave = () => {
  isHovered.value = false;
  isPressed.value = false;
  emit('mouseleave', new MouseEvent('mouseleave'));
};

const handleFocus = () => {
  if (props.status === 'enabled') {
    isFocused.value = true;
  }
  emit('focus', new FocusEvent('focus'));
};

const handleBlur = () => {
  isFocused.value = false;
  emit('blur', new FocusEvent('blur'));
};

const handleMouseDown = () => {
  if (props.status === 'enabled') {
    isPressed.value = true;
  }
};

const handleMouseUp = () => {
  isPressed.value = false;
};

// Computed token values based on theme
const themeColors = computed(() => colors[props.theme]);

// Computed styles
const radioButtonStyle = computed(() => {
  const unselectedStrokeColor = themeColors.value.fills.radioButtonAndCheckbox; // #888888 for light
  const selectedStrokeColor = themeColors.value.primary.green; // #008758
  const iconFillColor = themeColors.value.primary.green; // #008758
  const isDisabled = effectiveStatus.value === 'disabled';
  
  return {
    '--zux-radio-button-shape-bg': 'transparent', // Always transparent
    '--zux-radio-button-shape-border': props.checked ? selectedStrokeColor : unselectedStrokeColor,
    '--zux-radio-button-icon-fill': iconFillColor, // Green fill for radio icon
    '--zux-radio-button-shape-opacity': isDisabled ? states.disabled.opacity : '1', // 40% opacity when disabled
    '--zux-radio-button-disabled-opacity': isDisabled ? states.disabled.opacity : '1',
    '--zux-radio-button-disabled-cursor': isDisabled ? 'not-allowed' : 'pointer',
  };
});

// Computed style for background ellipse
const backgroundEllipseStyle = computed(() => {
  const status = effectiveStatus.value;
  let backgroundColor = 'transparent';
  
  if (status === 'hovered') {
    backgroundColor = themeColors.value.fills.hovered; // rgba(0, 0, 0, 0.10)
  } else if (status === 'focused' || status === 'pressed') {
    backgroundColor = themeColors.value.fills.focusedPressed; // rgba(0, 0, 0, 0.20)
  }
  
  return {
    '--zux-radio-button-ellipse-bg': backgroundColor,
    '--zux-radio-button-ellipse-radius': radii.full, // 62.5rem
  };
});
</script>

<style scoped>
.zux-radio-button {
  width: 3rem; /* 48px */
  height: 3rem; /* 48px */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */
}

.zux-radio-button__frame {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */
}

.zux-radio-button__button {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  position: relative;
  padding: 0;
  border: none;
  background: transparent;
  cursor: var(--zux-radio-button-disabled-cursor, pointer);
  opacity: var(--zux-radio-button-disabled-opacity, 1);
}

.zux-radio-button__button:focus {
  outline: none;
}

.zux-radio-button__bounding-box {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zux-radio-button__background-ellipse {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--zux-radio-button-ellipse-bg);
  border-radius: var(--zux-radio-button-ellipse-radius, 62.5rem); /* Full circle */
  z-index: 0;
}

.zux-radio-button__shape {
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  position: absolute;
  left: 0.125rem; /* 2px */
  top: 0.125rem; /* 2px */
  background: var(--zux-radio-button-shape-bg);
  border: 0.125rem solid var(--zux-radio-button-shape-border); /* 2px stroke */
  border-radius: 50%; /* Circle */
  box-sizing: border-box;
  opacity: var(--zux-radio-button-shape-opacity, 1); /* 40% opacity when disabled */
  z-index: 1;
}

.zux-radio-button__radio-icon {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  display: block;
  position: relative;
  z-index: 1;
}
</style>

