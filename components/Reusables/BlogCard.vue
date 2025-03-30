<template>
  <NuxtLink :to="`/blog/${article.slug}`" class="blog-card block">
    <div class="blog-card-image">
      <img v-if="article.thumbnail" :src="useImg(article.thumbnail)" :alt="article.title" class="w-full h-48 object-cover rounded-t-lg" />
      <div v-else class="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
        <span class="text-gray-400">No image</span>
      </div>
    </div>
    <div class="blog-card-content p-4 dark:bg-dark">
      <div class="flex items-center gap-2 mb-2">
        <span v-if="article.category?.name" class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {{ article.category.name }}
        </span>
        <span class="text-xs text-gray-500">{{ formatDate(article.date_created) }}</span>
      </div>
      
      <h3 class="text-lg font-semibold mb-2 line-clamp-2 dark:text-white">{{ article.title }}</h3>
      
      <p v-if="article.body" class="text-gray-600 mb-4 line-clamp-2 dark:text-gray-300">
        {{ stripHtml(article.body) }}
      </p>
      
      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center gap-2">
          <img 
            v-if="article.user_created?.avatar" 
            :src="useImg(article.user_created.avatar)" 
            class="w-8 h-8 rounded-full object-cover"
            :alt="`${article.user_created.first_name} ${article.user_created.last_name}`" 
          />
          <div v-else class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
            {{ getInitials(article.user_created) }}
          </div>
          <span class="text-sm dark:text-gray-400">
            {{ article.user_created?.first_name }} {{ article.user_created?.last_name }}
          </span>
        </div>
        
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span class="text-sm text-gray-500">{{ article.views || 0 }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IArticle } from '~/types/article';

const props = defineProps({
  article: {
    type: Object as PropType<IArticle>,
    required: true
  }
});

// Format date to a readable format
const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

// Strip HTML tags from body content for preview - SSR compatible
const stripHtml = (html: string) => {
  if (!html) return '';
  // Server-safe implementation that doesn't use document
  return html.replace(/<[^>]*>/g, '');
};

// Get user initials for avatar fallback
const getInitials = (user: { first_name?: string, last_name?: string } | undefined) => {
  if (!user) return '?';
  const first = user.first_name?.[0] || '';
  const last = user.last_name?.[0] || '';
  return (first + last).toUpperCase();
};
</script>

<style scoped>
.blog-card {
  @apply bg-white dark:bg-dark rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg;
}

.line-clamp-2 { 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>