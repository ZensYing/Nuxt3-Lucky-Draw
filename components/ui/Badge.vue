<template>
  <span :class="[
    'inline-flex items-center px-3 py-2 rounded-md border',
    variantClasses[variant],
    className
  ]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
interface BadgeProps {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  className: ''
});

const variantClasses = {
  default: 'bg-primary text-primary-foreground border-transparent',
  outline: 'bg-gray-800/50 text-gray-100 border-gray-600',
  secondary: 'bg-secondary text-secondary-foreground border-transparent',
  destructive: 'bg-destructive text-destructive-foreground border-transparent'
};
</script>