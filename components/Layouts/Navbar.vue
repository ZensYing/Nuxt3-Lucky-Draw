<template>
  <nav class="dark:text-white py-5 px-3 sticky top-0 z-[20]">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <!-- <button v-if="!isHomePage" @click="goBack"
          class="flex items-center space-x-1 text-gray-700 dark:text-light hover:text-green-600 transition-colors duration-300">
          <Icon icon="ic:baseline-arrow-back" class="w-5 h-5" />
        </button>
        <NuxtLink to="/" class="flex items-center">
          <img src="/Logo-Expo.png" alt="Logo" class="w-28" />
        </NuxtLink> -->
      </div>
      <div class="flex space-x-3">
        <div class="hidden md:flex space-x-6 items-center dark:bg-gray-700 px-4 py-2 dark:rounded-2xl">
        
        </div>

        <div class="flex space-x-3">
          <!-- <button @click="customToggleTheme" class="p-2 rounded focus:outline-none">
            <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
          </button> -->
          <div class="relative" ref="dropdownContainer">
            <button @click="toggleDropdown"
              class="flex items-center px-4 py-2 rounded-lg border border-dashed  border-light text-white focus:outline-none">
              {{ locale === 'en' ? 'English' : 'Khmer' }}
              <Icon icon="mdi:chevron-down" class="w-5 h-5 ml-2" />
            </button>
            <div v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-40 bg-white border  rounded-lg shadow-lg  border-gray-600">
              <button @click="switchLanguage('en')" :class="[
                'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600',
                locale === 'en' ? 'bg-gray-100 dark:bg-gray-600' : ''
              ]">
                English
              </button>
              <button @click="switchLanguage('km')" :class="[
                'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600',
                locale === 'km' ? 'bg-gray-100 dark:bg-gray-600' : ''
              ]">
                Khmer <Icon icon="twemoji:flag-cambodia" width="36" height="36" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import useTheme from '~/composables/useTheme';
import { useI18n } from 'vue-i18n';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const router = useRouter();
const route = useRoute();
const { theme, toggleTheme } = useTheme();

const isHomePage = computed(() => route.name === 'index');

const { t, locale } = useI18n();

// Function to switch languages
const { setFontClass } = useI18nConfig();

const switchLanguage = (newLocale: string) => {
  locale.value = newLocale; // Change the active locale
  if (process.client) {
    localStorage.setItem('locale', newLocale); // Save the new locale to localStorage
    setFontClass(newLocale); // Update the font class
  }
};
// Define the valid locales
type LocaleKey = 'en' | 'km';


// Create a computed array to dynamically return the correct language text

const dropdownOpen = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

// Toggle dropdown visibility
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};
const customToggleTheme = () => {
  if (theme.value === 'dark') {
    theme.value = 'light';
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    
  } else {
    theme.value = 'dark';
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  }
};


// Add event listener to close dropdown on outside click
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// Clean up event listener when the component is destroyed
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const goBack = () => {
  router.back();
};

const openLoginDialog = () => {
  console.log('Login dialog opened');
};

const logout = () => {
  console.log('Logged out');
};
</script>

<style scoped>
/* Custom styling and animations */

.nav-link {
  padding: 8px 12px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1dbf73;
}

.nav-link-active {
  color: #1dbf73;
}

/* Adjusting hover effect for smooth color transition */
.wrapper ul li a {
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 5px;
  display: inline-block;
  position: relative;
  transition: color 0.3s ease-in-out;
  color: inherit;
}

.wrapper ul li a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease-in-out;
}

.wrapper ul li a:hover::after {
  width: 100%;
}

/* Modern dropdown animations */
.group:hover .group-hover\:block {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Adding a subtle hover effect for submenu items */
.group:hover .group-hover\:block a:hover {
  transform: translateX(3px);
}
</style>