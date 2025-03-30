<template>
    <div :class="['rounded-lg border shadow', className]">
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    className?: string;
  }>();
  </script>