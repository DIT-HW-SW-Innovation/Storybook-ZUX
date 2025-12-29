<template>
  <div
    :class="[
      'zux-search-field',
      `zux-search-field--${stage}`,
      `zux-search-field--theme-${theme}`,
    ]"
    :style="fieldStyle"
  >
    <div class="zux-search-field__container">
      <div class="zux-search-field__input-wrapper" :style="inputStyle">
        <div class="zux-search-field__icon-text-wrapper">
          <!-- Search Icon -->
          <div class="zux-search-field__search-icon">
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
                d="M15 9.5C15 12.5376 12.5376 15 9.5 15C6.46243 15 4 12.5376 4 9.5C4 6.46243 6.46243 4 9.5 4C12.5376 4 15 6.46243 15 9.5ZM14.0491 15.4633C12.7873 16.4274 11.2105 17 9.5 17C5.35786 17 2 13.6421 2 9.5C2 5.35786 5.35786 2 9.5 2C13.6421 2 17 5.35786 17 9.5C17 11.2105 16.4274 12.7873 15.4633 14.0491L21.7071 20.2929L20.2929 21.7071L14.0491 15.4633Z"
                fill="var(--zux-search-field-icon-color)"
              />
            </svg>
          </div>

          <!-- Input Field -->
          <div class="zux-search-field__input-container">
            <input
              :class="[
                'zux-search-field__input',
                `zux-search-field__input--${stage}`,
              ]"
              type="text"
              :placeholder="placeholder"
              :value="displayValue"
              @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
              @focus="$emit('focus', $event)"
              @blur="$emit('blur', $event)"
            />
          </div>
        </div>

        <!-- Clear Icon (shown in typing stage) -->
        <button
          v-if="showClearButton"
          class="zux-search-field__clear-button"
          @click="handleClear"
          aria-label="Clear search"
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
              fill="var(--zux-search-field-icon-color)"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- External Label (shown in typing stage) -->
    <span
      v-if="showLabel"
      class="zux-search-field__label"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface SearchFieldProps {
  modelValue?: string;
  stage?: 'enabled' | 'typing';
  theme?: 'light' | 'dark';
  placeholder?: string;
  label?: string;
}

const props = withDefaults(defineProps<SearchFieldProps>(), {
  modelValue: '',
  stage: 'enabled',
  theme: 'light',
  placeholder: 'Search',
  label: 'Label',
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
  const themeColor = themeColors.value;
  
  // Text color for label - Texts-Primary (label only shows in typing stage)
  const labelTextColor = themeColor.texts.primary;
  
  // Based on HTML: width: 360px (22.5rem), padding: 24px (1.5rem) left/right, 6px (0.375rem) top/bottom, gap: 16px (1rem)
  return {
    '--zux-search-field-width': '22.5rem', // 360px
    '--zux-search-field-padding-x': '1.5rem', // 24px
    '--zux-search-field-padding-y': '0.375rem', // 6px
    '--zux-search-field-gap': '1rem', // 16px
    '--zux-search-field-font-family': typography.rowLabelLarge.family, // Rookery New
    '--zux-search-field-font-size': '1rem', // 16px
    '--zux-search-field-font-weight': '400', // From HTML
    '--zux-search-field-line-height': '1.5rem', // 24px from HTML
    '--zux-search-field-letter-spacing': '0.009375rem', // 0.15px
    '--zux-search-field-text-color': labelTextColor, // For label text color
  };
});

const inputStyle = computed(() => {
  const themeColor = themeColors.value;
  
  // Background color - #EDEDED for light mode (Backgrounds-Input-box)
  let bgColor = themeColor.backgrounds.inputBox;
  
  // Border color - all states have transparent border (no stroke)
  let borderColor = 'transparent';
  
  // Text color - Texts-Quaternary (#999999) for enabled placeholder, Texts-Primary for text
  const textColor = props.stage === 'enabled'
    ? themeColor.texts.quaternary // #999999 for placeholder
    : themeColor.texts.primary; // Normal text color when there's text
  
  // Icon color - Outline-icons-Secondary (#333333)
  const iconColor = themeColor.outlineIcons.secondary;

  // Based on HTML: height: 36px (2.25rem), padding: 12px (0.75rem) left/right, 5px (0.3125rem) top/bottom, border-radius: 8px (0.5rem)
  // Gap between icon and text: 4px (0.25rem)
  return {
    '--zux-search-field-bg': bgColor,
    '--zux-search-field-border-color': borderColor,
    '--zux-search-field-text-color': textColor,
    '--zux-search-field-icon-color': iconColor,
    '--zux-search-field-radius': '0.5rem', // 8px
    '--zux-search-field-height': '2.25rem', // 36px
    '--zux-search-field-input-padding-x': '0.75rem', // 12px
    '--zux-search-field-input-padding-y': '0.3125rem', // 5px
    '--zux-search-field-icon-size': '1.5rem', // 24px
    '--zux-search-field-icon-text-gap': '0.25rem', // 4px
  };
});

// Display value - use modelValue directly, placeholder will show when empty
const displayValue = computed(() => {
  return props.modelValue;
});

const showClearButton = computed(() => {
  return props.stage === 'typing';
});

const showLabel = computed(() => {
  return props.stage === 'typing';
});

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style scoped>
.zux-search-field {
  width: var(--zux-search-field-width);
  padding-left: var(--zux-search-field-padding-x);
  padding-right: var(--zux-search-field-padding-x);
  padding-top: var(--zux-search-field-padding-y);
  padding-bottom: var(--zux-search-field-padding-y);
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--zux-search-field-gap);
  font-family: var(--zux-search-field-font-family);
  font-size: var(--zux-search-field-font-size);
  font-weight: var(--zux-search-field-font-weight);
  line-height: var(--zux-search-field-line-height);
}

.zux-search-field__container {
  flex: 1 1 0;
}

.zux-search-field__input-wrapper {
  flex: 1 1 0;
  height: var(--zux-search-field-height);
  padding-left: var(--zux-search-field-input-padding-x);
  padding-right: var(--zux-search-field-input-padding-x);
  padding-top: var(--zux-search-field-input-padding-y);
  padding-bottom: var(--zux-search-field-input-padding-y);
  background: var(--zux-search-field-bg);
  border: 1px solid var(--zux-search-field-border-color);
  border-radius: var(--zux-search-field-radius);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zux-search-field__icon-text-wrapper {
  flex: 1 1 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--zux-search-field-icon-text-gap);
}

.zux-search-field__search-icon {
  width: var(--zux-search-field-icon-size);
  height: var(--zux-search-field-icon-size);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.zux-search-field__search-icon svg {
  width: var(--zux-search-field-icon-size);
  height: var(--zux-search-field-icon-size);
}

.zux-search-field__input-container {
  flex: 1 1 0;
  height: 1.5rem; /* 24px */
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.625rem; /* 10px */
}

.zux-search-field__input {
  flex: 1 1 0;
  height: 1.5rem; /* 24px */
  border: none;
  outline: none;
  background: transparent;
  color: var(--zux-search-field-text-color);
  caret-color: var(--Primary-colors-Blue, #2371EE);
  font-family: var(--zux-search-field-font-family);
  font-size: var(--zux-search-field-font-size);
  font-weight: var(--zux-search-field-font-weight);
  line-height: var(--zux-search-field-line-height);
  letter-spacing: var(--zux-search-field-letter-spacing);
  padding: 0;
  min-width: 0;
}

.zux-search-field__input::placeholder {
  color: var(--zux-search-field-text-color);
  opacity: 1;
  word-wrap: break-word;
}

.zux-search-field__clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  flex-shrink: 0;
  color: var(--zux-search-field-icon-color);
}

.zux-search-field__clear-button:hover {
  opacity: 0.7;
}

.zux-search-field__label {
  color: var(--zux-search-field-text-color);
  font-family: var(--zux-search-field-font-family);
  font-size: var(--zux-search-field-font-size);
  font-weight: var(--zux-search-field-font-weight);
  line-height: var(--zux-search-field-line-height);
  white-space: nowrap;
}
</style>

