<template>
    <div :class="['p-6', className]">
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    className?: string;
  }>();
  </script>
  