<template>
  <nav class="dark:text-white py-5 px-3 sticky top-0 z-[20]">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <button v-if="!isHomePage" @click="goBack"
          class="flex items-center space-x-1 text-gray-700 dark:text-light hover:text-green-600 transition-colors duration-300">
          <Icon icon="ic:baseline-arrow-back" class="w-5 h-5" />
        </button>
        <NuxtLink to="/" class="flex items-center">
          <!-- <img src="" alt="Logo" class="w-12" /> -->
          <h1 class="btn-shine">{/} Soratha </h1>
        </NuxtLink>
      </div>
      <div class="flex space-x-3">
        <div class="hidden md:flex space-x-6 items-center dark:bg-gray-700 px-4 py-2 dark:rounded-2xl">
          <div v-for="(item, index) in localizedMenuItems" :key="index" 
               class="relative group">
            <NuxtLink :to="!item.subItems ? item.to : '#'" 
                    class="flex items-center space-x-1 text-gray-700 dark:text-white hover:text-green-600 transition-colors duration-300">
              <Icon :icon="item.icon" class="w-5 h-5 dark:text-white" />
              <span>{{ item.text }}</span>
              <Icon v-if="item.subItems" icon="mdi:chevron-down" class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
            </NuxtLink>
            
            <!-- Modern submenu dropdown -->
            <div v-if="item.subItems" 
                 class="absolute hidden group-hover:block  py-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 z-50">
              <div class="p-3">
                <h3 class="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">{{ item.text }}</h3>
                <div class="grid gap-1">
                  <NuxtLink v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :to="subItem.to"
                      class="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 dark:bg-gray-700 mr-3">
                      <Icon :icon="subItem.icon" class="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <span class="text-gray-700 dark:text-gray-200">{{ subItem.text[locale as LocaleKey] }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-3">
          <button @click="customToggleTheme" class="p-2 rounded focus:outline-none">
            <Icon :icon="theme === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'" class="w-6 h-6" />
          </button>
          <div class="relative" ref="dropdownContainer">
            <button @click="toggleDropdown"
              class="flex items-center px-4 py-2 rounded-lg border border-dashed border-black dark:border-light dark:text-white focus:outline-none">
              {{ locale === 'en' ? 'English' : 'Khmer' }}
              <Icon icon="mdi:chevron-down" class="w-5 h-5 ml-2" />
            </button>
            <div v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
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
                Khmer
              </button>
            </div>
          </div>
          <button type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example"
            data-drawer-backdrop="true" aria-controls="drawer-example" class="md:hidden">
            <Icon icon="ci:hamburger-md" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  <transition appear enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500">
    <div v-if="showLightModeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
          Best viewed in dark mode!
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mt-2">
          For the best user experience, we recommend using dark mode.
        </p>
        <!-- Progress Bar -->
        <div class="w-full bg-gray-300 rounded-full mt-4 dark:bg-gray-700">
          <div class="h-2 bg-green-500 rounded-full" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>
    </div>
  </transition>
  <LayoutsDrawer :logout="logout" :openLoginDialog="openLoginDialog" />
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import LayoutsDrawer from '~/components/Layouts/Drawer.vue';
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
const menuItems = [
  {
    to: '/',
    icon: 'line-md:home',
    text: { en: 'Home', km: 'ទំព័រដើម' },
  },
  {
    to: '/blog',
    icon: 'game-icons:read',
    text: { en: 'Blog', km: 'ប្លុក' },
  },
  {
    to: '/project',
    icon: 'eos-icons:project-outlined',
    text: { en: 'Project', km: 'គម្រោង' },
  },
  {
    to: '/about',
    icon: 'ix:about',
    text: { en: 'About', km: 'អំពីយើង' },
  },
  {
    to: '/tools',
    icon: 'mdi:tools',
    text: { en: 'Tools', km: 'ឧបករណ៍' },
    subItems: [
      {
        to: '/tools/code-editor',
        icon: 'vscode-icons:file-type-vscode',
        text: { en: 'Code Editor', km: 'កម្មវិធីកែសម្រួលកូដ' },
      },
      {
        to: '/tools/api-tester',
        icon: 'simple-icons:postman',
        text: { en: 'API Tester', km: 'ឧបករណ៍សាកល្បង API' },
      },
      {
        to: '/tools/database-manager',
        icon: 'mdi:database',
        text: { en: 'Database Manager', km: 'កម្មវិធីគ្រប់គ្រងទិន្នន័យ' },
      },
      {
        to: '/tools/design-tools',
        icon: 'fa6-brands:figma',
        text: { en: 'Design Tools', km: 'ឧបករណ៍រចនា' },
      },
      {
        to: '/tools/ci-cd',
        icon: 'mdi:devops',
        text: { en: 'CI/CD Pipeline', km: 'បណ្ដាញ CI/CD' },
      },
      {
        to: '/tools/performance-monitor',
        icon: 'mdi:chart-timeline-variant',
        text: { en: 'Performance Monitor', km: 'ឧបករណ៍ត្រួតពិនិត្យប្រសិទ្ធភាព' },
      },
      {
        to: '/tools/version-control',
        icon: 'mdi:git',
        text: { en: 'Version Control', km: 'ការគ្រប់គ្រងកំណែ' },
      },
    ],
  },
];

// Create a computed array to dynamically return the correct language text
const localizedMenuItems = computed(() =>
  menuItems.map((item) => ({
    ...item,
    text: item.text[locale.value as LocaleKey], // Explicitly cast locale.value as a valid key
    subItems: item.subItems // Keep the subItems in the processed result
  }))
);
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


// 
const showLightModeModal = ref(false);
const progress = ref(0);

const customToggleTheme = () => {
  if (theme.value === 'dark') {
    theme.value = 'light';
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    // Show light mode modal
    showLightModeModal.value = true;
    progress.value = 0;
    const interval = setInterval(() => {
      progress.value += 10;
      if (progress.value >= 100) {
        clearInterval(interval);
        showLightModeModal.value = false;
      }
    }, 200); // Progress bar updates every 200ms
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