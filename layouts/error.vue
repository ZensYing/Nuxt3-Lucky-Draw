<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow flex flex-col items-center justify-center px-4">
      <div class="max-w-3xl w-full text-center">
        <!-- 404 SVG Animation -->
        <div class="w-full max-w-md mx-auto mb-8">
          <svg viewBox="0 0 400 200" class="w-full">
            <text x="50%" y="50%" dy=".35em" text-anchor="middle" class="text-9xl font-bold fill-current dark:text-white text-black stroke-current dark:stroke-gray-800 stroke-2">404</text>
          
          </svg>
        </div>

        <!-- Error Message -->
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {{ $t('pageNotFound.title') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('pageNotFound.message') }}
        </p>

        <!-- Path Info -->
        <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg inline-block">
          <p class="text-gray-500 dark:text-gray-400 font-mono">
            <span class="text-green-600 dark:text-green-400">{{ $t('pageNotFound.path') }}:</span> {{ currentPath }}
          </p>
        </div>

        <!-- Suggestions -->
       

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <NuxtLink to="/" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center">
            <Icon icon="line-md:home" class="w-5 h-5 mr-2" />
            {{ $t('pageNotFound.goHome') }}
          </NuxtLink>
          <button @click="goBack" class="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors duration-300 flex items-center">
            <Icon icon="ic:baseline-arrow-back" class="w-5 h-5 mr-2" />
            {{ $t('pageNotFound.goBack') }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Random 404 Phrase Animation -->
    <div class="fixed bottom-10 right-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 max-w-xs overflow-hidden opacity-0" :class="{ 'animate-phrase': showRandomPhrase }">
      <p class="text-gray-800 dark:text-white">{{ randomPhrase }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

// Current path
const currentPath = computed(() => route.path);



// Go back function
const goBack = () => {
  router.back();
};

// Random phrases animation
const phrases = computed(() => [
  t('pageNotFound.phrases.lost'),
  t('pageNotFound.phrases.void'),
  t('pageNotFound.phrases.explore'),
  t('pageNotFound.phrases.adventure'),
  t('pageNotFound.phrases.error')
]);

const randomPhrase = ref('');
const showRandomPhrase = ref(false);

onMounted(() => {
  // Show random phrases periodically
  setInterval(() => {
    randomPhrase.value = phrases.value[Math.floor(Math.random() * phrases.value.length)];
    showRandomPhrase.value = true;
    
    setTimeout(() => {
      showRandomPhrase.value = false;
    }, 3000);
  }, 7000);
});
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}

svg circle {
  animation: pulse 3s infinite ease-in-out;
}

svg circle:nth-child(2) {
  animation-delay: 0.5s;
}

svg circle:nth-child(3) {
  animation-delay: 1s;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.animate-phrase {
  animation: fadeInOut 3s ease-in-out forwards;
}
</style>