<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Error state -->
    <div v-if="error" class="max-w-3xl mx-auto bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
      <h1 class="text-2xl font-bold text-red-600 mb-2">Article Not Found</h1>
      <p class="text-gray-700 mb-4">The article you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/blog" class="inline-flex items-center text-blue-600 hover:text-blue-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
        Back to all articles
      </NuxtLink>
    </div>

    <!-- Loading state -->
    <div v-else-if="pending" class="max-w-3xl mx-auto">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div class="h-64 bg-gray-200 rounded mb-8"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- Article content -->
    <article v-else-if="article" class="max-w-3xl mx-auto">
      <!-- Breadcrumbs -->
      <nav class="flex mb-6 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-blue-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/blog" class="hover:text-blue-600">Blog</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-700 dark:text-gray-300 truncate  ">{{ article.title }}</span>
      </nav>
      
      <!-- Article header -->
      <header class="mb-8">
        <p class="text-3xl md:text-4xl leading-snug font-bold mb-4 dark:text-white ">{{ article.title }}</p>
        
        <div class="flex items-center gap-6 mb-6">
          <!-- Author info -->
          <div class="flex items-center gap-3">
            <img 
              v-if="article.user_created?.avatar" 
              :src="useImg(article.user_created.avatar)" 
              class="w-10 h-10 rounded-full object-cover"
              :alt="`${article.user_created.first_name} ${article.user_created.last_name}`" 
            />
            <div v-else class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              {{ getInitials(article.user_created) }}
            </div>
            <div>
              <div class="font-medium dark:text-white">
                {{ article.user_created?.first_name }} {{ article.user_created?.last_name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ formatDate(article.date_created) }}
              </div>
            </div>
          </div>
          
          <!-- Category -->
          <div v-if="article.category?.name" 
            class="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {{ article.category.name }}
          </div>
        </div>
        
        <!-- Views counter -->
        <div class="flex items-center text-gray-500 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>{{ article.views || 0 }} views</span>
        </div>
      </header>
      
      <!-- Featured image -->
      <figure v-if="article.thumbnail" class="mb-10">
        <img 
          :src="useImg(article.thumbnail)" 
          :alt="article.title" 
          class="w-full h-auto rounded-lg shadow-md"
        />
      </figure>
      
      <!-- Article content -->
      <div class="prose prose-lg max-w-none dark:prose-invert dark:text-white" v-html="article.body"></div>
      
      <!-- Article footer -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <!-- Share buttons -->
        <div class="flex items-center gap-2 mb-8">
          <span class="text-gray-600 dark:text-gray-400 font-medium">Share this article:</span>
          <button 
            v-for="social in socialLinks" 
            :key="social.name"
            @click="share(social.url)"
            class="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:opacity-80"
            :class="social.bgColor"
            :title="`Share on ${social.name}`"
          >
            <span class="sr-only">Share on {{ social.name }}</span>
            <component :is="social.icon" class="w-4 h-4" />
          </button>
        </div>
        
        <!-- Related articles (placeholder) -->
        <div v-if="relatedArticles && relatedArticles.length > 0" class="mt-10">
          <h3 class="text-xl font-bold mb-6 dark:text-white">Related Articles</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ReusablesBlogCard 
              v-for="relatedArticle in relatedArticles" 
              :key="relatedArticle.id" 
              :article="relatedArticle" 
            />
          </div>
        </div>
      </div>  
    </article>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/api';
import type { IArticle } from '~/types/article';

// Get the route params
const route = useRoute();
const slug = computed(() => route.params.slug as string);

// Define reactive states
const pending = ref(true);
const error = ref(false);
const article = ref<IArticle | null>(null);
const relatedArticles = ref<IArticle[]>([]);

// Fetch article data
const fetchArticle = async () => {
  pending.value = true;
  error.value = false;
  
  try {
    const response = await tcapi<IResponse<IArticle[]>>(
      `/items/articles?filter[slug][_eq]=${slug.value}&filter[status]=published&fields=id,title,date_created,slug,thumbnail,category.name,user_created.first_name,user_created.last_name,user_created.avatar,views,body`,
      { method: 'GET' }
    );
    
    if (response?.data && response.data.length > 0) {
      article.value = response.data[0];
      // Fetch related articles
      await fetchRelatedArticles();
    }
     else {
      error.value = true;
    }
  } catch (e) {
    console.error('Error fetching article:', e);
    error.value = true;
  } finally {
    pending.value = false;
  }
};

// Fetch related articles based on the same category
const fetchRelatedArticles = async () => {
  if (!article.value?.category?.name) return;
  
  try {
    const response = await tcapi<IResponse<IArticle[]>>(
      `/items/articles?filter[category][name][_eq]=${article.value.category.name}&filter[user_created]=eff2eb53-3ec0-48dc-9ac8-89d7e6d494c3&filter[id][_neq]=${article.value.id}&filter[status]=published&sort=-date_created&limit=2&fields=id,title,date_created,slug,thumbnail,category.name,user_created.first_name,user_created.last_name,user_created.avatar,views,body`,
      { method: 'GET' }
    );
    
    if (response?.data) {
      relatedArticles.value = response.data;
    }
  } catch (e) {
    console.error('Error fetching related articles:', e);
  }
};

onMounted(() => {
  if (slug.value) {
    fetchArticle();
  }
});



// Format date to a readable format
const formatDate = (dateString: any) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

// Get user initials for avatar fallback
const getInitials = (user: { first_name?: string, last_name?: string } | undefined) => {
  if (!user) return '?';
  const first = user.first_name?.[0] || '';
  const last = user.last_name?.[0] || '';
  return (first + last).toUpperCase();
};

// Social sharing
const socialLinks = [
  {
    name: 'Twitter',
    url: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    bgColor: 'bg-blue-400',
    icon: defineComponent({
      render: () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', { d: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' })
      ])
    })
  },
  {
    name: 'Facebook',
    url: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    bgColor: 'bg-blue-600',
    icon: defineComponent({
      render: () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', { d: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' })
      ])
    })
  },
  {
    name: 'LinkedIn',
    url: (url: string, title: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
    bgColor: 'bg-blue-700',
    icon: defineComponent({
      render: () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        fill: 'currentColor',
        viewBox: '0 0 24 24'
      }, [
        h('path', { d: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' })
      ])
    })
  },
];

// Share article function
const share = (urlBuilder: (url: string, title: string) => string) => {
  if (!article.value) return;
  
  const title = encodeURIComponent(article.value.title);
  const url = encodeURIComponent(`${window.location.origin}/blog/${article.value.slug}`);
  
  window.open(urlBuilder(url, title), '_blank');
};

// Set page metadata
useHead(() => ({
  title: article.value?.title ? `${article.value.title} | Blog` : 'Article Not Found | Blog',
  meta: [
    { 
      name: 'description', 
      content: article.value?.body ? stripHtml(article.value.body).substring(0, 160) : 'Article not found' 
    }
  ]
}));

// Strip HTML tags from body content for meta description
const stripHtml = (html: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

// Fetch article when the route changes
watchEffect(() => {
  if (slug.value) {
    fetchArticle();
  }
});

// SEO optimization
useSeoMeta({
  title: () => article.value?.title ? `${article.value.title} | Blog` : 'Article Not Found | Blog',
  ogTitle: () => article.value?.title || 'Article Not Found',
  description: () => article.value?.body 
    ? stripHtml(article.value.body).substring(0, 160) 
    : 'Article not found',
  ogDescription: () => article.value?.body 
    ? stripHtml(article.value.body).substring(0, 160) 
    : 'Article not found',
});



</script>
<style scoped>
</style>