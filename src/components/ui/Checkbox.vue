<template>
  <div
    :class="[
      'zux-checkbox',
      `zux-checkbox--${checked ? 'selected' : 'unselected'}`,
      `zux-checkbox--${status}`,
      `zux-checkbox--theme-${theme}`,
    ]"
    :style="checkboxStyle"
  >
    <div class="zux-checkbox__frame">
      <button
        class="zux-checkbox__button"
        :disabled="status === 'disabled'"
        :aria-checked="checked"
        :aria-disabled="status === 'disabled'"
        role="checkbox"
        @click="handleClick"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
      >
        <div class="zux-checkbox__bounding-box">
          <div
            v-if="effectiveStatus === 'hovered' || effectiveStatus === 'focused' || effectiveStatus === 'pressed'"
            class="zux-checkbox__background-ellipse"
            :style="backgroundEllipseStyle"
          ></div>
          <div class="zux-checkbox__shape"></div>
          <svg
            v-if="checked"
            class="zux-checkbox__check-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.7072 9.70694L11.7072 15.7069L11.0001 16.414L10.293 15.7069L6.29297 11.7069L7.70718 10.2927L11.0001 13.5856L16.293 8.29272L17.7072 9.70694Z"
              fill="white"
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

export interface CheckboxProps {
  checked?: boolean;
  status?: 'enabled' | 'hovered' | 'focused' | 'pressed' | 'disabled';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<CheckboxProps>(), {
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

// Watch for when checkbox becomes selected and immediately clear pressed state
watch(() => props.checked, (newValue) => {
  if (newValue === true) {
    // Immediately clear pressed state when checkbox becomes selected
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
const checkboxStyle = computed(() => {
  const strokeColor = themeColors.value.fills.radioButtonAndCheckbox; // #888888 for light
  const fillColor = themeColors.value.primary.green; // #008758
  const isDisabled = effectiveStatus.value === 'disabled';
  
  return {
    '--zux-checkbox-shape-bg': props.checked ? fillColor : 'transparent',
    '--zux-checkbox-shape-border': props.checked ? 'transparent' : strokeColor,
    '--zux-checkbox-shape-opacity': isDisabled ? states.disabled.opacity : '1', // 40% opacity when disabled
    '--zux-checkbox-disabled-opacity': isDisabled ? states.disabled.opacity : '1',
    '--zux-checkbox-disabled-cursor': isDisabled ? 'not-allowed' : 'pointer',
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
    '--zux-checkbox-ellipse-bg': backgroundColor,
    '--zux-checkbox-ellipse-radius': radii.full, // 62.5rem
  };
});
</script>

<style scoped>
.zux-checkbox {
  width: 3rem; /* 48px */
  height: 3rem; /* 48px */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */
}

.zux-checkbox__frame {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem; /* 10px */
}

.zux-checkbox__button {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  position: relative;
  padding: 0;
  border: none;
  background: transparent;
  cursor: var(--zux-checkbox-disabled-cursor, pointer);
  opacity: var(--zux-checkbox-disabled-opacity, 1);
}

.zux-checkbox__button:focus {
  outline: none;
}

.zux-checkbox__bounding-box {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zux-checkbox__background-ellipse {
  width: 2.5rem; /* 40px */
  height: 2.5rem; /* 40px */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--zux-checkbox-ellipse-bg);
  border-radius: var(--zux-checkbox-ellipse-radius, 62.5rem); /* Full circle */
  z-index: 0;
}

.zux-checkbox__shape {
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  position: absolute;
  left: 0.125rem; /* 2px */
  top: 0.125rem; /* 2px */
  background: var(--zux-checkbox-shape-bg);
  border: 0.125rem solid var(--zux-checkbox-shape-border); /* 2px stroke */
  border-radius: 50%; /* Circle */
  box-sizing: border-box;
  opacity: var(--zux-checkbox-shape-opacity, 1); /* 40% opacity when disabled */
  z-index: 1;
}

.zux-checkbox__check-icon {
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  display: block;
  position: relative;
  z-index: 1;
}
</style>

