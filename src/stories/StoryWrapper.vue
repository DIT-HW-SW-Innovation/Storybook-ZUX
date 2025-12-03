<template>
  <div
    class="story-wrapper"
    :style="{
      width: '100vw',
      minHeight: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      background: darkMode ? '#0f1116' : '#f5f6fb'
    }"
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

