<template>
  <div
    :class="[
      'zux-progress-indicator',
      `zux-progress-indicator--theme-${theme}`,
    ]"
    :style="containerStyle"
  >
    <div 
      class="zux-progress-indicator__track"
      :style="trackStyle"
    >
      <div
        :key="animationKey"
        class="zux-progress-indicator__fill"
        :class="{ 'zux-progress-indicator__fill--animating': isAnimating }"
        :style="fillStyle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { colors } from '../../tokens/colors';
import { radii } from '../../tokens/radii';

export interface ProgressIndicatorProps {
  progress?: number; // 0-100
  theme?: 'light' | 'dark';
  width?: string; // Width in rem
  height?: string; // Height in rem
}

const props = withDefaults(defineProps<ProgressIndicatorProps>(), {
  progress: 0,
  theme: 'light',
  width: '6.25rem', // 100px
  height: '0.1875rem', // 3px
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

const containerStyle = computed(() => {
  return {
    '--zux-progress-indicator-width': props.width,
    '--zux-progress-indicator-height': props.height,
    '--zux-progress-indicator-border-radius': radii.full, // var(--Corner-radius-Full, 62.5rem)
  };
});

const trackStyle = computed(() => {
  const themeColor = themeColors.value;
  return {
    '--zux-progress-indicator-bg-color': themeColor.fills.progressIndicatorSlider,
  };
});

const fillStyle = computed(() => {
  const themeColor = themeColors.value;
  // Calculate width percentage: when progress is 0, width is 0%; when progress is 100, width is 100%
  const currentProgress = animatedProgress.value > 0 ? animatedProgress.value : props.progress;
  
  return {
    '--zux-progress-indicator-fill-color': themeColor.primary.blue,
    '--zux-progress-indicator-duration': '2000ms', // 2 seconds for smooth progress animation
    '--zux-progress-indicator-width-percent': `${currentProgress}%`,
  };
});

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
    // Keep animatedProgress at targetProgress so it stays at 100%
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
.zux-progress-indicator {
  display: inline-block;
  width: var(--zux-progress-indicator-width);
  height: var(--zux-progress-indicator-height);
}

.zux-progress-indicator__track {
  width: 100%;
  height: 100%;
  background: var(--zux-progress-indicator-bg-color);
  border-radius: var(--zux-progress-indicator-border-radius);
  overflow: hidden;
  position: relative;
}

.zux-progress-indicator__fill {
  height: 100%;
  width: var(--zux-progress-indicator-width-percent);
  background: var(--zux-progress-indicator-fill-color);
  border-radius: var(--zux-progress-indicator-border-radius);
  transition: width var(--zux-progress-indicator-duration) cubic-bezier(0.4, 0, 0.2, 1);
}

.zux-progress-indicator__fill--animating {
  transition: width var(--zux-progress-indicator-duration) cubic-bezier(0.4, 0, 0.2, 1);
}
</style>


