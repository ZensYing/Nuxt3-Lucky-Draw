<!-- components/BlogCard.vue -->
<script setup lang="ts">
import type  { BlogPost } from '~/types/blog';
defineProps<{
  post: BlogPost
}>()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <NuxtLink :to="`/blog/${post.slug}`" class="block">
      <img 
        :src="post.thumbnail" 
        :alt="post.title"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <span 
            v-if="post.trending" 
            class="px-2 py-1 text-xs font-semibold bg-red-100 text-red-600 rounded-full"
          >
            Trending
          </span>
          <span class="text-sm text-gray-500">
            {{ formatDate(post.date_created) }}
          </span>
        </div>
        
        <h2 class="text-xl font-bold text-gray-900 mb-2">{{ post.title }}</h2>
        
        <p class="text-gray-600 mb-4 line-clamp-2">{{ post.body }}</p>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {{ post.category }}
            </span>
            <span class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {{ post.sub_category }}
            </span>
          </div>
          <div class="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            {{ post.views }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>