<template>
    <div class="container mx-auto min-h-screen py-8">
      <h1 class="text-4xl font-bold mb-4">{{ blog?.title }}</h1>
      <p class="text-gray-500 text-sm mb-4">
        Published on {{ formatDate(blog?.date_created) }}
      </p>
      <img
        v-if="blog?.thumbnail"
        :src="blog.thumbnail"
        :alt="blog.title"
        class="w-full h-64 object-cover mb-6"
      />
      <div class="text-gray-800 text-lg leading-relaxed">
        <p>{{ blog?.body }}</p>
      </div>
      <div class="mt-8">
        <h2 class="text-2xl font-bold">Category</h2>
        <p class="text-gray-600">{{ blog?.category }}</p>
        <h2 class="text-2xl font-bold mt-4">Subcategory</h2>
        <p class="text-gray-600">{{ blog?.sub_category }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useNestApi } from '~/composables/useApi';
  import type { BlogPost } from '~/types/blog';
  
  // State for the blog post
  const blog = ref<BlogPost | null>(null);
  
  // Extract slug from route params
  const route = useRoute();
  const slug = route.params.slug as string;
  
  // Fetch the blog details
  const fetchBlogDetails = async () => {
    try {
      blog.value = await useNestApi<BlogPost>(`/blogs/${slug}`, { method: 'GET' });
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };
  
  // Format date for display
  const formatDate = (date: string | undefined) => {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  onMounted(() => {
    fetchBlogDetails();
  });
  </script>
  
  <style scoped>
/*  */
  </style>
  