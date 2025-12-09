<template>
  <div
    :class="[
      'zux-alphabetical-index',
      `zux-alphabetical-index--theme-${theme}`,
    ]"
    :style="indexStyle"
  >
    <!-- Star icon at the top -->
    <button
      v-if="showStar"
      :class="[
        'zux-alphabetical-index__item',
        'zux-alphabetical-index__item--icon',
        { 'zux-alphabetical-index__item--selected': selectedItem === 'star' }
      ]"
      :style="itemStyle('star')"
      @click="handleItemClick('star', $event)"
      @mouseenter="handleMouseEnter('star', $event)"
      @mouseleave="handleMouseLeave('star', $event)"
      aria-label="Favorites"
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="zux-alphabetical-index__star-icon"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.00648 0.416687C5.37539 0.416685 5.7004 0.65924 5.80537 1.0129L6.47035 3.25331H8.75001C9.10588 3.25331 9.42248 3.47929 9.53812 3.81585C9.65376 4.15241 9.54292 4.52527 9.2622 4.74399L7.42541 6.17515L8.0702 8.52994C8.16495 8.87595 8.02762 9.24376 7.72929 9.44301C7.43097 9.64225 7.0386 9.62821 6.75528 9.40815L5.00328 8.04737L3.22505 9.41125C2.93752 9.63179 2.54042 9.64123 2.24273 9.43461C1.94503 9.22799 1.81499 8.85267 1.92104 8.50616L2.63488 6.17359L0.748515 4.75218C0.462321 4.53653 0.346038 4.16206 0.45974 3.82223C0.573441 3.4824 0.891665 3.25331 1.25001 3.25331H3.54264L4.2076 1.01291C4.31257 0.659247 4.63757 0.416689 5.00648 0.416687ZM4.16457 4.08664H1.25001L3.60254 5.85931L2.71789 8.75002L5.00649 6.99468L7.26646 8.75002L6.47492 5.85931L8.75001 4.08664H5.84843L5.00649 1.25002L4.16457 4.08664Z"
          fill="currentColor"
        />
      </svg>
    </button>

    <!-- Letters A-Z -->
    <button
      v-for="letter in letters"
      :key="letter"
      :class="[
        'zux-alphabetical-index__item',
        'zux-alphabetical-index__item--letter',
        { 'zux-alphabetical-index__item--selected': selectedItem === letter }
      ]"
      :style="itemStyle(letter)"
      @click="handleItemClick(letter, $event)"
      @mouseenter="handleMouseEnter(letter, $event)"
      @mouseleave="handleMouseLeave(letter, $event)"
      :aria-label="`Jump to ${letter}`"
    >
      {{ letter }}
    </button>

    <!-- Hash symbol at the bottom -->
    <button
      v-if="showHash"
      :class="[
        'zux-alphabetical-index__item',
        'zux-alphabetical-index__item--hash',
        { 'zux-alphabetical-index__item--selected': selectedItem === '#' }
      ]"
      :style="itemStyle('#')"
      @click="handleItemClick('#', $event)"
      @mouseenter="handleMouseEnter('#', $event)"
      @mouseleave="handleMouseLeave('#', $event)"
      aria-label="Numbers and special characters"
    >
      #
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radii } from '../../tokens/radii';

export interface AlphabeticalIndexProps {
  selectedItem?: string | null;
  theme?: 'light' | 'dark';
  showStar?: boolean;
  showHash?: boolean;
}

const props = withDefaults(defineProps<AlphabeticalIndexProps>(), {
  selectedItem: null,
  theme: 'light',
  showStar: true,
  showHash: true,
});

const emit = defineEmits<{
  itemClick: [item: string, event: MouseEvent];
  itemHover: [item: string, event: MouseEvent];
  itemHoverEnd: [item: string, event: MouseEvent];
}>();

const hoveredItem = ref<string | null>(null);

// Generate A-Z letters
const letters = computed(() => {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
});

// Get theme colors
const themeColors = computed(() => colors[props.theme]);

// Container styles - no background needed
const indexStyle = computed(() => {
  return {};
});

// Item styles based on selection and hover state
const itemStyle = computed(() => (item: string) => {
  const isSelected = props.selectedItem === item;
  const isHovered = hoveredItem.value === item;
  const themeColor = themeColors.value;

  if (isSelected) {
    // Selected state: white text on blue circular background
    // Light mode: #2371EE, Dark mode: #538dff (automatically switches via themeColor)
    const blueColor = themeColor.primary.blue;
    return {
      backgroundColor: blueColor, // Set directly for reliability
      background: blueColor, // Also set background property
      '--zux-index-item-bg': blueColor, // Keep for CSS fallback
      color: themeColor.fills.inverseOnSurface, // White text - Set directly (switches with theme)
      '--zux-index-item-text': themeColor.fills.inverseOnSurface,
      '--zux-index-item-width': '0.875rem',
      '--zux-index-item-height': '0.875rem',
      borderRadius: '2.8125rem', // Specific border-radius for selected state
      '--zux-index-item-radius': '2.8125rem',
      border: 'none', // Explicitly remove border
      '--zux-index-item-font-family': 'Rookery New',
      '--zux-index-item-font-size': '0.625rem',
      '--zux-index-item-font-weight': '500',
      '--zux-index-item-line-height': '0.8125rem',
    };
  } else {
    // Unselected state: grey text, no background
    // Light mode: texts.tertiary (grey), Dark mode: texts.tertiary (lighter grey) - automatically switches
    return {
      backgroundColor: 'transparent', // Set directly for reliability
      background: 'transparent', // Also set background property
      '--zux-index-item-bg': 'transparent',
      color: themeColor.texts.tertiary, // Text color - Set directly (switches with theme)
      '--zux-index-item-text': themeColor.texts.tertiary,
      '--zux-index-item-width': '0.875rem',
      '--zux-index-item-height': '0.875rem',
      '--zux-index-item-radius': radii.full,
      border: 'none', // Explicitly remove border
      '--zux-index-item-font-family': 'Rookery New',
      '--zux-index-item-font-size': '0.625rem',
      '--zux-index-item-font-weight': '500',
      '--zux-index-item-line-height': '0.8125rem',
    };
  }
});

const handleItemClick = (item: string, event: MouseEvent) => {
  emit('itemClick', item, event);
};

const handleMouseEnter = (item: string, event: MouseEvent) => {
  hoveredItem.value = item;
  emit('itemHover', item, event);
};

const handleMouseLeave = (item: string, event: MouseEvent) => {
  hoveredItem.value = null;
  emit('itemHoverEnd', item, event);
};
</script>

<style scoped>
.zux-alphabetical-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem; /* spacing.extraSmall */
  padding: 0;
}

.zux-alphabetical-index__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: var(--zux-index-item-width, 0.875rem);
  height: var(--zux-index-item-height, 0.875rem);
  min-width: var(--zux-index-item-width, 0.875rem);
  min-height: var(--zux-index-item-height, 0.875rem);
  /* Background and color are set via inline styles for reliability */
  border: none !important;
  border-radius: var(--zux-index-item-radius);
  font-family: var(--zux-index-item-font-family, 'Rookery New');
  font-size: var(--zux-index-item-font-size, 0.625rem);
  font-style: normal;
  font-weight: var(--zux-index-item-font-weight, 500);
  line-height: var(--zux-index-item-line-height, 0.8125rem);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  padding: 0;
  /* Reset browser default button styles */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.zux-alphabetical-index__item:hover {
  opacity: 0.8;
}

.zux-alphabetical-index__item:focus {
  outline: 2px solid var(--zux-index-focus-ring, rgba(35, 113, 238, 0.5));
  outline-offset: 2px;
}

.zux-alphabetical-index__star-icon {
  width: 0.625rem; /* Match font size */
  height: 0.625rem; /* Match font size */
  display: block;
}

.zux-alphabetical-index__item--selected {
  /* Selected state is handled via inline styles */
  /* Ensure no border shows */
  border: none !important;
  outline: none;
}
</style>

