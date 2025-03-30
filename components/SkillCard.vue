<template>
    <Card class="group relative overflow-hidden bg-gray-900/80 border-gray-700 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(100,100,255,0.1)] to-transparent group-hover:via-[rgba(100,100,255,0.2)] animate-shimmer"></div>
      <CardContent class="p-6 relative z-10">
        <div class="flex items-center gap-4 mb-6">
          <div :class="`p-3 rounded-xl bg-gray-800/50 ${color} group-hover:scale-110 transition-transform duration-300`">
            <component :is="icon" class="w-8 h-8" />
          </div>
          <h3 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            {{ title }}
          </h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="(skill, index) in skills"
            :key="index"
            variant="outline"
            class="group/badge relative bg-gray-800/50 hover:bg-gray-700/80 text-gray-100 border-gray-600 flex items-center gap-2 py-2 px-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <span class="transform group-hover/badge:scale-110 transition-transform duration-300">
              <component :is="skill.icon" />
            </span>
            <span class="font-medium">{{ skill.name }}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  </template>
  
  <script setup lang="ts">
  import Card from '~/components/ui/Card.vue';
  import CardContent from '~/components/ui/CardContent.vue';
  import Badge from '~/components/ui/Badge.vue';
  
  interface Skill {
    name: string;
    icon: Component;
  }
  
  defineProps<{
    icon: Component;
    title: string;
    skills: Skill[];
    color: string;
  }>();
  </script>