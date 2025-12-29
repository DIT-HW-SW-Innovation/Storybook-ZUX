<template>
  <div
    :class="[
      'zux-progress-indicator-circular',
      `zux-progress-indicator-circular--theme-${theme}`,
    ]"
    :style="containerStyle"
  >
    <svg
      class="zux-progress-indicator-circular__svg"
      :width="size"
      :height="size"
      viewBox="0 0 18 18"
    >
      <!-- Background circle (empty state) -->
      <circle
        class="zux-progress-indicator-circular__background"
        :style="backgroundCircleStyle"
        cx="9"
        cy="9"
        :r="radius"
        fill="none"
      />
      <!-- Progress circle (filled state) -->
      <circle
        :key="animationKey"
        class="zux-progress-indicator-circular__progress"
        :class="{ 'zux-progress-indicator-circular__progress--animating': isAnimating }"
        :style="progressCircleStyle"
        cx="9"
        cy="9"
        :r="radius"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashOffset"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { colors } from '../../tokens/colors';
import { motion } from '../../tokens/motion';

export interface ProgressIndicatorCircularProps {
  progress?: number; // 0-100
  theme?: 'light' | 'dark';
  size?: string; // Size in rem
  strokeWidth?: string; // Stroke width in rem
}

const props = withDefaults(defineProps<ProgressIndicatorCircularProps>(), {
  progress: 0,
  theme: 'light',
  size: '1.125rem', // 18px
  strokeWidth: '0.125rem', // 2px
});

const emit = defineEmits<{
  'animation-complete': [];
}>();

// Animation state
const isAnimating = ref(false);
const animatedProgress = ref(0);
const animationKey = ref(0); // Force re-render for animation restart

// Computed values
const themeColors = computed(() => colors[props.theme]);

// SVG calculations
// Size: 1.125rem (18px), stroke: 0.125rem (2px)
// Radius: (18 - 2) / 2 = 8px = 0.5rem
const radius = computed(() => {
  // Convert size to pixels for calculation: 1.125rem = 18px
  const sizePx = 18;
  const strokePx = 2;
  return (sizePx - strokePx) / 2; // 8px
});

const circumference = computed(() => {
  return 2 * Math.PI * radius.value; // ~50.27
});

const containerStyle = computed(() => {
  return {
    '--zux-progress-indicator-circular-size': props.size,
  };
});

const backgroundCircleStyle = computed(() => {
  const themeColor = themeColors.value;
  return {
    '--zux-progress-indicator-circular-stroke-width': props.strokeWidth,
    '--zux-progress-indicator-circular-bg-color': themeColor.fills.progressIndicatorSlider,
  };
});

const progressCircleStyle = computed(() => {
  const themeColor = themeColors.value;
  return {
    '--zux-progress-indicator-circular-stroke-width': props.strokeWidth,
    '--zux-progress-indicator-circular-progress-color': themeColor.primary.blue,
    '--zux-progress-indicator-circular-duration': '2000ms', // 2 seconds for smooth progress animation
  };
});

const strokeDashOffset = computed(() => {
  // Calculate offset: circumference * (1 - progress / 100)
  // When progress is 0, offset = circumference (fully hidden)
  // When progress is 100, offset = 0 (fully visible)
  // Use animatedProgress if we've animated, otherwise use props.progress
  const currentProgress = animatedProgress.value > 0 ? animatedProgress.value : props.progress;
  return circumference.value * (1 - currentProgress / 100);
});

// Watch for progress changes to trigger animation
watch(
  () => props.progress,
  (newProgress) => {
    if (newProgress > 0 && newProgress <= 100) {
      startAnimation(newProgress);
    }
  }
);

const startAnimation = (targetProgress: number) => {
  // Reset to 0 first
  isAnimating.value = false;
  animatedProgress.value = 0;
  animationKey.value++;
  
  // Use nextTick to ensure DOM is updated before starting animation
  setTimeout(() => {
    isAnimating.value = true;
    // Set to target progress - CSS transition will animate it
    animatedProgress.value = targetProgress;
    
    // Emit complete event after animation duration
    // Keep animatedProgress at 100 so it doesn't reset
    setTimeout(() => {
      isAnimating.value = false;
      // Keep animatedProgress at targetProgress so it stays at 100%
      emit('animation-complete');
    }, 2000); // Match CSS transition duration
  }, 10);
};

// Expose method to trigger animation
defineExpose({
  startAnimation: () => startAnimation(100),
});
</script>

<style scoped>
.zux-progress-indicator-circular {
  display: inline-flex;
  width: var(--zux-progress-indicator-circular-size);
  height: var(--zux-progress-indicator-circular-size);
}

.zux-progress-indicator-circular__svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* Start from top */
}

.zux-progress-indicator-circular__background {
  stroke: var(--zux-progress-indicator-circular-bg-color);
  stroke-width: var(--zux-progress-indicator-circular-stroke-width);
}

.zux-progress-indicator-circular__progress {
  stroke: var(--zux-progress-indicator-circular-progress-color);
  stroke-width: var(--zux-progress-indicator-circular-stroke-width);
  stroke-linecap: round;
  transition: stroke-dashoffset var(--zux-progress-indicator-circular-duration) cubic-bezier(0.4, 0, 0.2, 1);
}

.zux-progress-indicator-circular__progress--animating {
  transition: stroke-dashoffset var(--zux-progress-indicator-circular-duration) cubic-bezier(0.4, 0, 0.2, 1);
}
</style>


