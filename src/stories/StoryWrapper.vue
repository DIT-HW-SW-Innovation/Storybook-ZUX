<template>
  <div
    class="story-wrapper"
    :class="{ 'story-wrapper--dark': darkMode }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    darkMode?: boolean;
  }>(),
  {
    darkMode: false,
  }
);
</script>

<style scoped>
.story-wrapper {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}

.story-wrapper--dark {
  background: #0f1116;
}
</style>
