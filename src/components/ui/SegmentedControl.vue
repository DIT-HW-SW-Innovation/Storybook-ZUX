<template>
  <div
    :class="[
      'zux-segmented-control',
      `zux-segmented-control--${variant}`,
      `zux-segmented-control--theme-${theme}`,
    ]"
    :style="containerStyle"
  >
    <template v-if="variant === 'center-aligned'">
      <!-- Center-aligned variant: Each tab wrapped in a flex container with equal width -->
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="zux-segmented-control__tab-wrapper"
      >
        <div
          :class="[
            'zux-segmented-control__tab',
            {
              'zux-segmented-control__tab--active': index === effectiveActiveIndex,
            },
          ]"
          :style="tabStyle(index === effectiveActiveIndex, index === hoveredTabIndex, tab.disabled)"
          @click="!tab.disabled && handleTabClick(index)"
          @mouseenter="!tab.disabled && handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <!-- Active tab structure -->
          <template v-if="index === effectiveActiveIndex">
            <div class="zux-segmented-control__tab-content zux-segmented-control__tab-content--active">
              <div class="zux-segmented-control__tab-label-wrapper zux-segmented-control__tab-label-wrapper--active">
                <div 
                  class="zux-segmented-control__tab-label"
                  :style="tab.disabled ? { opacity: '0.4' } : {}"
                >
                  {{ tab.label }}
                </div>
                <!-- Active indicator bar -->
                <div class="zux-segmented-control__indicator" />
              </div>
            </div>
          </template>
          <!-- Inactive tab structure -->
          <template v-else>
            <div class="zux-segmented-control__tab-content">
              <div class="zux-segmented-control__tab-label-wrapper">
                <div 
                  class="zux-segmented-control__tab-label"
                  :style="tab.disabled ? { opacity: '0.4' } : {}"
                >
                  {{ tab.label }}
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- Left-aligned variant: Direct tabs with gap -->
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          'zux-segmented-control__tab',
          {
            'zux-segmented-control__tab--active': index === effectiveActiveIndex,
          },
        ]"
        :style="tabStyle(index === effectiveActiveIndex, index === hoveredTabIndex, tab.disabled)"
        @click="!tab.disabled && handleTabClick(index)"
        @mouseenter="!tab.disabled && handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
      >
      <!-- Active tab structure -->
      <template v-if="index === effectiveActiveIndex">
        <div class="zux-segmented-control__tab-content zux-segmented-control__tab-content--active">
          <div class="zux-segmented-control__tab-label-wrapper zux-segmented-control__tab-label-wrapper--active">
            <div 
              class="zux-segmented-control__tab-label"
              :style="tab.disabled ? { opacity: '0.4' } : {}"
            >
              {{ tab.label }}
            </div>
            <!-- Active indicator bar -->
            <div class="zux-segmented-control__indicator" />
          </div>
        </div>
      </template>
      <!-- Inactive tab structure -->
      <template v-else>
        <div class="zux-segmented-control__tab-content">
          <div class="zux-segmented-control__tab-label-wrapper">
            <div 
              class="zux-segmented-control__tab-label"
              :style="tab.disabled ? { opacity: '0.4' } : {}"
            >
              {{ tab.label }}
            </div>
          </div>
        </div>
      </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

export interface Tab {
  label: string;
  stage?: 'enabled' | 'focused' | 'typing' | 'success';
  disabled?: boolean;
}

export interface SegmentedControlProps {
  tabs: Tab[];
  activeIndex?: number;
  variant?: 'left-aligned' | 'center-aligned';
  theme?: 'light' | 'dark';
}

const props = withDefaults(defineProps<SegmentedControlProps>(), {
  activeIndex: 0,
  variant: 'left-aligned',
  theme: 'light',
});

const emit = defineEmits<{
  'update:activeIndex': [index: number];
  'tab-click': [index: number];
}>();

// Track hovered tab index
const hoveredTabIndex = ref<number | null>(null);

// Computed active index that ensures disabled tabs cannot be active
const effectiveActiveIndex = computed(() => {
  const requestedIndex = props.activeIndex;
  // If the requested index is disabled, find the first enabled tab
  if (props.tabs[requestedIndex]?.disabled) {
    const firstEnabledIndex = props.tabs.findIndex(tab => !tab.disabled);
    return firstEnabledIndex >= 0 ? firstEnabledIndex : 0;
  }
  return requestedIndex;
});

// Watch for changes and emit update if activeIndex points to disabled tab
watch(
  () => [props.activeIndex, props.tabs],
  () => {
    if (props.tabs[props.activeIndex]?.disabled) {
      const firstEnabledIndex = props.tabs.findIndex(tab => !tab.disabled);
      if (firstEnabledIndex >= 0 && firstEnabledIndex !== props.activeIndex) {
        emit('update:activeIndex', firstEnabledIndex);
      }
    }
  },
  { immediate: true }
);

// Computed token values based on theme
const themeColors = computed(() => colors[props.theme]);

const containerStyle = computed(() => {
  const themeColor = themeColors.value;
  
  // Based on HTML: width: 800px (50rem), padding: 32px (2rem) left/right
  // Left-aligned: gap: 32px (2rem)
  // Center-aligned: gap: 0 (uses padding on tab wrappers instead)
  // Background: #F7F7F7 (Backgrounds-Top-app-bar-&-Navigation-bar-&-Tool-bar)
  return {
    '--zux-segmented-control-width': '50rem', // 800px
    '--zux-segmented-control-padding-x': '2rem', // 32px
    '--zux-segmented-control-gap': props.variant === 'center-aligned' ? '0' : '2rem', // 0 for center-aligned, 2rem for left-aligned
    '--zux-segmented-control-bg': themeColor.backgrounds.topAppBar,
    '--zux-segmented-control-font-family': typography.rowLabelLarge.family, // Rookery New
    '--zux-segmented-control-font-size': '1rem', // 16px
    '--zux-segmented-control-font-weight': '400', // From HTML
    '--zux-segmented-control-line-height': '1.5rem', // 24px
    '--zux-segmented-control-letter-spacing': '0.009375rem', // 0.15px
    '--zux-segmented-control-tab-wrapper-padding-x': '0.25rem', // 4px for center-aligned variant
  };
});

const tabStyle = computed(() => (isActive: boolean, isHovered: boolean, isDisabled: boolean = false) => {
  const themeColor = themeColors.value;
  
  // Active tab: height 53px (3.3125rem), gap 4px (0.25rem)
  // Inactive tab: height 56px (3.5rem), padding 16px (1rem) top/bottom, gap 6px (0.375rem)
  // Hovered tab: height 54px (3.375rem), padding 16px (1rem) top/bottom, gap 6px (0.375rem), background: Fills-Hovered
  // Both: min-width 48px (3rem)
  // Text color: Primary Blue for active, Texts-Tertiary for inactive
  // Indicator: width 55px (3.4375rem), height 2px (0.125rem), left 8px (0.5rem), top 28px (1.75rem)
  
  // Determine height based on active and hovered states
  // Hovered tabs (active or inactive) use 3.375rem
  // Active but not hovered: 3.3125rem
  // Inactive and not hovered: 3.5rem
  let height: string;
  if (isHovered) {
    height = '3.375rem'; // 54px - hovered (applies to both active and inactive)
  } else if (isActive) {
    height = '3.3125rem'; // 53px - active but not hovered
  } else {
    height = '3.5rem'; // 56px - inactive and not hovered
  }
  
  // Background color: Fills-Hovered when hovered (but not if disabled)
  const backgroundColor = isHovered && !isDisabled ? themeColor.fills.hovered : 'transparent';
  
  // Padding: hovered tabs (active or inactive) use 1rem, active but not hovered use 0
  // Disabled tabs don't respond to hover
  const paddingY = isHovered && !isDisabled ? '1rem' : (isActive ? '0' : '1rem');
  
  // Gap: hovered tabs use 0.375rem (6px), active but not hovered use 0.25rem (4px)
  // Disabled tabs don't respond to hover
  const gap = isHovered && !isDisabled ? '0.375rem' : (isActive ? '0.25rem' : '0.375rem');
  
  // Height: disabled tabs don't respond to hover
  if (isDisabled && isHovered) {
    // If disabled and somehow hovered, use default inactive height
    height = isActive ? '3.3125rem' : '3.5rem';
  }
  
  return {
    '--zux-segmented-control-tab-height': height,
    '--zux-segmented-control-tab-min-width': '3rem', // 48px
    '--zux-segmented-control-tab-gap': gap,
    '--zux-segmented-control-tab-padding-y': paddingY,
    '--zux-segmented-control-tab-text-color': isActive
      ? themeColor.primary.blue // #2371EE for active
      : themeColor.texts.tertiary, // #666666 for inactive
    '--zux-segmented-control-tab-bg': backgroundColor,
    '--zux-segmented-control-indicator-color': themeColor.primary.blue, // #2371EE
    '--zux-segmented-control-indicator-width': '3.4375rem', // 55px
    '--zux-segmented-control-indicator-height': '0.125rem', // 2px
    '--zux-segmented-control-indicator-left': '0.5rem', // 8px
    '--zux-segmented-control-indicator-top': '1.75rem', // 28px
    '--zux-segmented-control-label-padding-x': '0.5rem', // 8px
    '--zux-segmented-control-tab-cursor': isDisabled ? 'not-allowed' : 'pointer',
    '--zux-segmented-control-tab-flex': props.variant === 'center-aligned' ? '1 1 0' : '0 0 auto',
  };
});

const handleTabClick = (index: number) => {
  emit('update:activeIndex', index);
  emit('tab-click', index);
};

const handleMouseEnter = (index: number) => {
  hoveredTabIndex.value = index;
};

const handleMouseLeave = () => {
  hoveredTabIndex.value = null;
};
</script>

<style scoped>
.zux-segmented-control {
  width: var(--zux-segmented-control-width);
  padding-left: var(--zux-segmented-control-padding-x);
  padding-right: var(--zux-segmented-control-padding-x);
  background: var(--zux-segmented-control-bg);
  overflow: hidden;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--zux-segmented-control-gap);
  font-family: var(--zux-segmented-control-font-family);
  font-size: var(--zux-segmented-control-font-size);
  font-weight: var(--zux-segmented-control-font-weight);
  line-height: var(--zux-segmented-control-line-height);
}

.zux-segmented-control--center-aligned {
  justify-content: center;
  gap: 0; /* No gap for center-aligned, uses padding on wrappers instead */
}

.zux-segmented-control__tab-wrapper {
  flex: 1 1 0;
  padding-left: var(--zux-segmented-control-tab-wrapper-padding-x);
  padding-right: var(--zux-segmented-control-tab-wrapper-padding-x);
  display: flex;
  justify-content: center;
  align-items: center;
}

.zux-segmented-control__tab {
  height: var(--zux-segmented-control-tab-height);
  min-width: var(--zux-segmented-control-tab-min-width);
  padding-top: var(--zux-segmented-control-tab-padding-y);
  padding-bottom: var(--zux-segmented-control-tab-padding-y);
  background: var(--zux-segmented-control-tab-bg);
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--zux-segmented-control-tab-gap);
  cursor: var(--zux-segmented-control-tab-cursor, pointer);
}

/* Center-aligned variant: tabs should flex to fill wrapper */
.zux-segmented-control--center-aligned .zux-segmented-control__tab {
  flex: var(--zux-segmented-control-tab-flex);
  width: 100%;
}

.zux-segmented-control__tab-content {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.375rem; /* 6px */
}

.zux-segmented-control__tab-content--active {
  gap: 0.375rem; /* 6px */
}

.zux-segmented-control__tab-label-wrapper {
  padding-left: var(--zux-segmented-control-label-padding-x);
  padding-right: var(--zux-segmented-control-label-padding-x);
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.zux-segmented-control__tab-label-wrapper--active {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem; /* 4px */
}

.zux-segmented-control__tab-label {
  text-align: center;
  color: var(--zux-segmented-control-tab-text-color);
  font-family: var(--zux-segmented-control-font-family);
  font-size: var(--zux-segmented-control-font-size);
  font-weight: var(--zux-segmented-control-font-weight);
  line-height: var(--zux-segmented-control-line-height);
  letter-spacing: var(--zux-segmented-control-letter-spacing);
  word-wrap: break-word;
}

.zux-segmented-control__indicator {
  width: var(--zux-segmented-control-indicator-width);
  height: var(--zux-segmented-control-indicator-height);
  position: absolute;
  left: var(--zux-segmented-control-indicator-left);
  top: var(--zux-segmented-control-indicator-top);
  background: var(--zux-segmented-control-indicator-color);
  border-radius: 0.0625rem; /* 1px */
}
</style>


