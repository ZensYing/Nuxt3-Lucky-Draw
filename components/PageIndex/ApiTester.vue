<!-- components/ApiTester.vue -->
<template>

    <div class="min-h-screen bg-gray-50 dark:bg-gray-900   ">
      <!-- Two Column Layout -->
      <div class="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column - Welcome Section -->
        <div class="bg-blue-50 dark:bg-gray-800 rounded-3xl p-8 md:max-h-[70vh]">
          <div class="mb-2">
            <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm px-4 py-1 rounded-full">
              API Testing Made Easy
            </span>
          </div>
  
          <h1 class="text-5xl font-bold text-blue-600 dark:text-blue-400 mt-6 mb-4">
            Welcome to API Tester
          </h1>
  
          <p class="text-gray-600 dark:text-gray-300 mb-12 text-lg">
            Streamline your API testing process with powerful and intuitive tool. Debug, validate, and optimize your endpoints with ease.
          </p>
  
          <div class="space-y-8">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Key Features:</h2>
            
            <!-- Feature Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- HTTP Methods -->
              <div class="flex items-start space-x-4">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Icon icon="material-symbols:code" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Multiple HTTP Methods</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Support for GET, POST, PUT, DELETE, and PATCH requests.</p>
                </div>
              </div>
  
              <!-- Real-time Testing -->
              <div class="flex items-start space-x-4">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Icon icon="material-symbols:bolt" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Real-time Testing</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Instantly send requests and view responses.</p>
                </div>
              </div>
  
              <!-- Response Viewer -->
              <div class="flex items-start space-x-4">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Icon icon="material-symbols:data-object" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">Response Viewer</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Syntax-highlighted JSON response and headers display.</p>
                </div>
              </div>
  
              <!-- User Interface -->
              <div class="flex items-start space-x-4">
                <div class="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Icon icon="material-symbols:dashboard" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">User-Friendly Interface</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Intuitive design for effortless API testing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Column - API Tester -->
        <div class="space-y-6">
          <!-- Tester Card -->
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">API Tester</h2>
              <button @click="toggleTheme" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Icon :icon="isDark ? 'ph:sun' : 'ph:moon'" class="w-5 h-5" />
              </button>
            </div>
  
            <div class="space-y-4">
              <div class="flex gap-4">
                <!-- Method Selector -->
                <Menu as="div" class="relative">
                  <MenuButton class="w-28 px-4 py-2 text-left bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                    {{ method }}
                  </MenuButton>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems class="absolute z-10 mt-2 w-28 rounded-lg bg-white dark:bg-gray-700 shadow-lg border border-gray-200 dark:border-gray-600">
                      <div class="py-1">
                        <MenuItem v-for="m in methods" :key="m" v-slot="{ active }">
                          <button
                            @click="method = m"
                            :class="[
                              active ? 'bg-gray-100 dark:bg-gray-600' : '',
                              'block w-full text-left px-4 py-2 text-sm'
                            ]"
                          >
                            {{ m }}
                          </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
  
                <!-- URL Input -->
                <input
                  v-model="url"
                  type="text"
                  placeholder="Enter API URL"
                  class="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
  
              <!-- Send Button -->
              <button
                @click="handleSubmit"
                :disabled="loading"
                class="w-full px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Icon icon="material-symbols:send" class="w-4 h-4" />
                Send Request
              </button>
            </div>
          </div>
  
          <!-- Response Card -->
          <div v-if="loading || response || error" class="bg-white dark:bg-gray-800 rounded-3xl shadow-sm">
            <div class="p-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Response</h2>
              
              <!-- Tabs -->
              <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
                <div class="flex space-x-8">
                  <button
                    v-for="tab in ['Response', 'Headers']"
                    :key="tab"
                    @click="activeTab = tab"
                    :class="[
                      'pb-4 text-sm font-medium',
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    ]"
                  >
                    {{ tab }}
                  </button>
                </div>
              </div>
  
              <!-- Content -->
              <div class="min-h-[200px]">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center h-[200px]">
                  <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                </div>
  
                <!-- Error State -->
                <div v-else-if="error" class="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  {{ error }}
                </div>
  
                <!-- Response Content -->
                <div v-else>
                  <div v-if="activeTab === 'Response'" class="font-mono text-sm">
                    <pre class="whitespace-pre-wrap text-gray-800 dark:text-gray-200 overflow-x-auto">{{ JSON.stringify(response?.body, null, 2) }}</pre>
                  </div>
                  <div v-else class="font-mono text-sm space-y-2">
                    <div v-for="(value, key) in response?.headers" :key="key" class="py-1">
                      <span class="text-blue-600 dark:text-blue-400">{{ key }}:</span>
                      <span class="text-gray-800 dark:text-gray-200 ml-2">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
  type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  import { useApiTester } from '~/composables/useApiTester'
  
  const isDark = ref(false)
  const method = ref<HttpMethod>('GET')
  const url = ref('')
  const activeTab = ref('Response')
  const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  
  const { response, loading, error, sendRequest } = useApiTester()
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
  }
  
  const handleSubmit = () => {
    if (!url.value) return
    
    sendRequest({
      method: method.value,
      url: url.value
    })
  }
  </script>