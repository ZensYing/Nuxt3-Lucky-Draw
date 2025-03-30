<template>
  <div class="container mx-auto py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReusablesBlogCard 
        v-for="article in popularArticles" 
        :key="article.id" 
        :article="article" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IResponse } from '~/types/api';
import type { IArticle } from '~/types/article';

const { data: popularArticles } = await useAsyncData<IArticle[]>(
  'popular-articles',
  () =>
    tcapi<IResponse<IArticle[]>>(
      `/items/articles?filter[user_created]=eff2eb53-3ec0-48dc-9ac8-89d7e6d494c3&filter[status]=published&sort=-date_created&fields=id,title,date_created,slug,thumbnail,category.name,user_created.first_name,user_created.last_name,user_created.avatar,views,body`,
      { method: 'GET' }
    ).then(res => res.data),
  { 
    server: true, // only fetch on the server
    lazy: true,  
  }
);
</script>
