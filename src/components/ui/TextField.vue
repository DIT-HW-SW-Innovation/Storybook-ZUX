<template>
  <div
    :class="[
      'zux-text-field',
      `zux-text-field--${stage}`,
      `zux-text-field--theme-${theme}`,
    ]"
    :style="fieldStyle"
  >
    <div class="zux-text-field__container">
      <div
        :class="[
          'zux-text-field__input-wrapper',
          { 'zux-text-field__input-wrapper--error': stage === 'error' }
        ]"
        :style="inputStyle"
      >
        <div
          :class="[
            'zux-text-field__input-container',
            { 'zux-text-field__input-container--typing': stage === 'typing' }
          ]"
        >
          <input
            :class="[
              'zux-text-field__input',
              `zux-text-field__input--${stage}`,
            ]"
            type="text"
            :placeholder="placeholder"
            :value="displayValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
          />
        </div>
        <!-- Clear Icon (shown in typing and error stages) -->
        <button
          v-if="showClearButton"
          class="zux-text-field__clear-button"
          @click="handleClear"
          aria-label="Clear input"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.4143 11.9998L18.7072 6.70694L17.293 5.29272L12.0001 10.5856L6.70718 5.29272L5.29297 6.70694L10.5859 11.9998L5.29297 17.2927L6.70718 18.7069L12.0001 13.414L17.293 18.7069L18.7072 17.2927L13.4143 11.9998Z"
              fill="var(--zux-text-field-icon-color)"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Error Message (shown in error stage) -->
    <div
      v-if="showErrorMessage"
      class="zux-text-field__error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface TextFieldProps {
  modelValue?: string;
  stage?: 'enabled' | 'typing' | 'error';
  theme?: 'light' | 'dark';
  placeholder?: string;
  errorMessage?: string;
}

const props = withDefaults(defineProps<TextFieldProps>(), {
  modelValue: '',
  stage: 'enabled',
  theme: 'light',
  placeholder: 'Input text',
  errorMessage: 'Supporting text',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  clear: [];
}>();

// Computed token values based on theme
const themeColors = computed(() => colors[props.theme]);

const fieldStyle = computed(() => {
  // Based on HTML: width: 400px (25rem), flex-direction: column, gap: 2px (0.125rem)
  return {
    '--zux-text-field-width': '25rem', // 400px
    '--zux-text-field-gap': '0.125rem', // 2px
    '--zux-text-field-font-family': typography.rowLabelLarge.family, // Rookery New
    '--zux-text-field-font-size': '1rem', // 16px
    '--zux-text-field-font-weight': '400', // From HTML
    '--zux-text-field-line-height': '1.5rem', // 24px from HTML
    '--zux-text-field-letter-spacing': '0.009375rem', // 0.15px
  };
});

const inputStyle = computed(() => {
  const themeColor = themeColors.value;
  
  // Background color - #EDEDED for light mode (Backgrounds-Input-box)
  let bgColor = themeColor.backgrounds.inputBox;
  
  // Border color - all states have transparent border (no stroke)
  // Error state has red outline: outline: 1px var(--Primary-colors-Red, #EE0004) solid; outline-offset: -1px
  let borderColor = 'transparent';
  let outlineColor = 'transparent';
  if (props.stage === 'error') {
    outlineColor = themeColor.primary.red; // #EE0004
  }
  
  // Text color - Texts-Tertiary (#666666) for enabled placeholder, Texts-Primary for text
  const textColor = props.stage === 'enabled'
    ? themeColor.texts.tertiary // #666666 for placeholder
    : themeColor.texts.primary; // Normal text color when there's text
  
  // Icon color - Outline-icons-Secondary (#333333)
  const iconColor = themeColor.outlineIcons.secondary;
  
  // Error message color - Primary-colors-Red (#EE0004)
  const errorColor = themeColor.primary.red;

  // Based on HTML: height: 36px (2.25rem), padding: 12px (0.75rem) left/right, 5px (0.3125rem) top/bottom, border-radius: 8px (0.5rem)
  // Container padding: 6px (0.375rem) top/bottom, gap: 16px (1rem)
  // Text max-width: 274px (17.125rem) for typing stage
  return {
    '--zux-text-field-bg': bgColor,
    '--zux-text-field-border-color': borderColor,
    '--zux-text-field-outline-color': outlineColor,
    '--zux-text-field-text-color': textColor,
    '--zux-text-field-icon-color': iconColor,
    '--zux-text-field-error-color': errorColor,
    '--zux-text-field-radius': '0.5rem', // 8px
    '--zux-text-field-height': '2.25rem', // 36px
    '--zux-text-field-input-padding-x': '0.75rem', // 12px
    '--zux-text-field-input-padding-y': '0.3125rem', // 5px
    '--zux-text-field-container-padding-y': '0.375rem', // 6px
    '--zux-text-field-container-gap': '1rem', // 16px
    '--zux-text-field-icon-size': '1.5rem', // 24px
  };
});

// Display value - use modelValue directly, placeholder will show when empty
const displayValue = computed(() => {
  return props.modelValue;
});

const showClearButton = computed(() => {
  return props.stage === 'typing' || props.stage === 'error';
});

const showErrorMessage = computed(() => {
  return props.stage === 'error';
});

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style scoped>
.zux-text-field {
  width: var(--zux-text-field-width);
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--zux-text-field-gap);
  font-family: var(--zux-text-field-font-family);
  font-size: var(--zux-text-field-font-size);
  font-weight: var(--zux-text-field-font-weight);
  line-height: var(--zux-text-field-line-height);
}

.zux-text-field__container {
  align-self: stretch;
  padding-top: var(--zux-text-field-container-padding-y);
  padding-bottom: var(--zux-text-field-container-padding-y);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--zux-text-field-container-gap);
}

.zux-text-field__input-wrapper {
  flex: 1 1 0;
  height: var(--zux-text-field-height);
  padding-left: var(--zux-text-field-input-padding-x);
  padding-right: var(--zux-text-field-input-padding-x);
  padding-top: var(--zux-text-field-input-padding-y);
  padding-bottom: var(--zux-text-field-input-padding-y);
  background: var(--zux-text-field-bg);
  border: 1px solid var(--zux-text-field-border-color);
  border-radius: var(--zux-text-field-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zux-text-field__input-wrapper--error {
  outline: 1px solid var(--zux-text-field-outline-color);
  outline-offset: -1px;
}

.zux-text-field__input-container {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.zux-text-field__input-container--typing {
  max-width: 17.125rem; /* 274px */
}

.zux-text-field__input {
  flex: 1 1 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--zux-text-field-text-color);
  caret-color: var(--Primary-colors-Blue, #2371EE);
  font-family: var(--zux-text-field-font-family);
  font-size: var(--zux-text-field-font-size);
  font-weight: var(--zux-text-field-font-weight);
  line-height: var(--zux-text-field-line-height);
  letter-spacing: var(--zux-text-field-letter-spacing);
  padding: 0;
  min-width: 0;
  word-wrap: break-word;
}

.zux-text-field__input::placeholder {
  color: var(--zux-text-field-text-color);
  opacity: 1;
  word-wrap: break-word;
}

.zux-text-field__clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  flex-shrink: 0;
  color: var(--zux-text-field-icon-color);
}

.zux-text-field__clear-button:hover {
  opacity: 0.7;
}

.zux-text-field__error-message {
  align-self: stretch;
  color: var(--zux-text-field-error-color);
  font-family: var(--zux-text-field-font-family);
  font-size: var(--zux-text-field-font-size);
  font-weight: var(--zux-text-field-font-weight);
  line-height: var(--zux-text-field-line-height);
  letter-spacing: var(--zux-text-field-letter-spacing);
  word-wrap: break-word;
}
</style>
