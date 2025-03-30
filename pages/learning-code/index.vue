<!-- pages/learning-code/index.vue -->
<template>
    <div class="min-h-screen bg-dark text-white">
      <!-- Header Section -->
      <header class="p-6 border-b border-gray-800">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center space-x-3 mb-4">
            <Icon name="ph:sun" class="text-orange-400 w-6 h-6" />
            <h1 class="text-2xl text-gray-300">Good {{ timeOfDay }}, {{ username }}</h1>
          </div>
          <div class="flex items-center space-x-3">
            <Icon name="ph:clock" class="text-blue-400 w-6 h-6" />
            <span class="text-4xl font-bold">{{ currentTime }}</span>
          </div>
          <p class="text-blue-400 mt-4 flex items-center">
            Learning is a journey, not a destination
            <Icon name="ph:book" class="ml-2 w-5 h-5" />
          </p>
        </div>
      </header>
  
      <!-- Programming Language Navigation -->
      <nav class="py-6 px-6 border-b border-gray-800">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <button 
              v-for="lang in languages" 
              :key="lang.name"
              :class="[
                'flex items-center justify-center space-x-2 p-4 rounded-xl transition-all',
                'bg-gray-800/50 hover:bg-gray-700/50',
                activeLang === lang.name ? 'ring-2 ring-blue-500' : ''
              ]"
              @click="activeLang = lang.name"
            >
              <img :src="lang.icon" :alt="lang.name" class="w-6 h-6" />
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 px-6">
        <div class="grid grid-cols-12 gap-6">
          <!-- Sidebar -->
          <div class="col-span-12 md:col-span-3">
            <div class="bg-gray-800/50 rounded-xl p-4">
              <nav class="space-y-2">
                <button
                  v-for="topic in pythonTopics"
                  :key="topic.id"
                  @click="activeTopic = topic.id"
                  :class="[
                    'w-full flex items-center space-x-3 p-3 rounded-lg text-left',
                    activeTopic === topic.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-gray-700/50'
                  ]"
                >
                  <Icon :name="topic.icon" class="w-5 h-5" />
                  <span>{{ topic.name }}</span>
                </button>
              </nav>
            </div>
          </div>
  
          <!-- Content Area -->
          <div class="col-span-12 md:col-span-9 space-y-6">
            <!-- Language Pills -->
            <div class="flex space-x-3">
              <span
                v-for="lang in programmingLanguages"
                :key="lang"
                :class="[
                  'px-3 py-1 rounded-full text-sm',
                  'bg-gray-800/50 text-gray-400'
                ]"
              >
                {{ lang }}
              </span>
            </div>
  
            <!-- Lesson Content -->
            <div class="bg-gray-800/50 rounded-xl p-6">
              <h2 class="text-2xl font-bold mb-4">Introduction to Python</h2>
              <p class="text-gray-400 mb-6">
                Python is a high-level, interpreted programming language known for its simplicity and readability. 
                It's widely used in various fields, including web development, data science, and artificial intelligence.
              </p>
  
              <!-- Code Editor -->
              <div class="bg-gray-900 rounded-xl overflow-hidden">
                <div class="flex items-center justify-between p-3 border-b border-gray-800">
                  <span>app.py</span>
                  <button class="p-1 hover:bg-gray-800 rounded">
                    <Icon name="ph:moon" class="w-5 h-5" />
                  </button>
                </div>
                <div class="p-4">
                  <pre class="font-mono text-sm"><span class="text-green-500"># This is a simple Python example</span>
  <span class="text-blue-500">print</span>(<span class="text-red-500">"Hello, World!"</span>)
  
  <span class="text-green-500"># Try changing the message and click 'Run Code'!</span></pre>
                </div>
                <div class="flex items-center justify-between p-3 border-t border-gray-800">
                  <button class="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
                    <Icon name="ph:play" class="w-4 h-4" />
                    <span>Run Code</span>
                  </button>
                  <button class="px-4 py-2 hover:bg-gray-800 rounded">Reset</button>
                </div>
              </div>
  
              <!-- Pro Tips -->
              <div class="mt-6 bg-gray-900/50 rounded-xl p-4">
                <h3 class="flex items-center space-x-2 text-lg font-semibold mb-3">
                  <Icon name="ph:lightbulb" class="w-5 h-5 text-yellow-500" />
                  <span>Pro Tips</span>
                </h3>
                <ul class="space-y-2 text-gray-400">
                  <li class="flex items-center space-x-2">
                    <Icon name="ph:dot" class="w-4 h-4" />
                    <span>Python uses indentation to define code blocks</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon name="ph:dot" class="w-4 h-4" />
                    <span>Python is dynamically typed</span>
                  </li>
                  <li class="flex items-center space-x-2">
                    <Icon name="ph:dot" class="w-4 h-4" />
                    <span>Python has a large standard library and many third-party packages</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Language {
    name: string
    icon: string
  }
  
  interface Topic {
    id: string
    name: string
    icon: string
  }
  
  // State
  const username = ref('soun')
  const activeLang = ref('Python')
  const activeTopic = ref('introduction')
  
  // Constants
  const languages: Language[] = [
    { name: 'API Tester', icon: '/icons/api.png' },
    { name: 'Python', icon: '/icons/python.png' },
    { name: 'C++', icon: '/icons/cpp.png' },
    { name: 'Next.js', icon: '/icons/nextjs.png' },
    { name: 'PHP', icon: '/icons/php.png' },
    { name: 'NodeJS', icon: '/icons/nodejs.png' },
    { name: 'Create Website', icon: '/icons/web.png' },
  ]
  
  const pythonTopics: Topic[] = [
    { id: 'introduction', name: 'Introduction', icon: 'ph:hand-waving' },
    { id: 'variables', name: 'Variables', icon: 'ph:database' },
    { id: 'datatypes', name: 'Data Types', icon: 'ph:brackets-curly' },
    { id: 'operators', name: 'Operators', icon: 'ph:plus-minus' },
    { id: 'functions', name: 'Functions', icon: 'ph:function' },
    { id: 'conditionals', name: 'Conditionals', icon: 'ph:git-branch' },
    { id: 'loops', name: 'Loops', icon: 'ph:repeat' },
    { id: 'lists', name: 'Lists', icon: 'ph:list-bullets' },
    { id: 'dictionaries', name: 'Dictionaries', icon: 'ph:book-open' },
  ]
  
  const programmingLanguages = ['HTML', 'CSS', 'JavaScript', 'Python', 'TypeScript', 'PHP']
  
  // Time utilities
  const currentTime = computed(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  })
  
  const timeOfDay = computed(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Morning'
    if (hour < 17) return 'Afternoon'
    return 'Evening'
  })
  </script>