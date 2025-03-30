<template>
  <BackgroundAnimationAnimate />
    <div class="absolute pointer-events-none">
      <div class="css-blurry-gradient-blue"></div>
      <div class="css-blurry-gradient-blue"></div>
    </div>
    <main class=" md:pt-20 lg:pt-0 text-white min-h-screen">
      <section class="hero min-h-screen flex items-center relative px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
  
  
        <!-- Main content container -->
        <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-12 lg:py-0">
          <!-- Left column - Text content -->
          <div class="w-full lg:w-1/2 mb-12 lg:mb-0 animate__animated animate__fadeInLeft relative">
            <!-- Decorative blurs -->
            <div
              class="absolute hidden lg:-top-20 lg:-left-20 lg:block w-48 h-48 lg:w-64 lg:h-64 bg-blue-500/10 rounded-full blur-3xl">
            </div>
            <div
              class="absolute hidden lg:block lg:top-40 lg:-right-20 w-48 h-48 lg:w-64 lg:h-64 bg-teal-500/10 rounded-full blur-3xl">
            </div>
  
            <!-- Welcome badge -->
            <div
              class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6 sm:mb-8 animate__animated animate__fadeInDown animate__delay-1s">
              <div class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span class="text-gray-300 text-xs sm:text-sm font-medium">Welcome to my universe</span>
            </div>
  
            <!-- Name section -->
            <div class="relative mb-6 sm:mb-8">
              <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span class="relative inline-block">
                  I'm
                  <span class="typing-effect gradient-text"> Soratha  </span>
                </span>
              </h1>
              <div
                class="absolute -z-10 top-1/2 -translate-y-1/2 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse">
              </div>
            </div>
          <Typewriter />

            <!-- Description -->
            <div class="relative mb-8 sm:mb-12 max-w-xl">
                <p class="text-lg  lg:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
            {{ $t('hero_des') }}
          </p>
            </div>
  
            <!-- CTA Buttons -->
        
  
            <!-- Floating badges -->
            <div class="hidden lg:block absolute left-[5.5rem] top-[2.3rem] animate-float-slow">
              <div
                class="px-4 py-2 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-purple-400">
                <i class="fas fa-wand-magic-sparkles"></i>&nbsp;&nbsp;UI Magic
              </div>
            </div>
            <div class="hidden lg:block absolute right-32  top-20 animate-float">
              <div class="px-4 py-2 rounded-lg bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 text-blue-400">
                <i class="fas fa-code"></i>&nbsp;&nbsp;Clean Code
              </div>
            </div>
            <div class="hidden lg:block absolute top-[10rem] left-[70%] transform -translate-x-1/2 animate-float">
              <div
                class="px-4 py-2 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/20 text-amber-400">
                <i class="fas fa-lightbulb"></i>&nbsp;&nbsp;Innovation
              </div>
            </div>
          </div>
  
          <!-- Right column - Code window -->
          <div class="w-full  lg:w-1/2 animate__animated animate__fadeInDown animate__delay-0.1s">
            <div class="gradient-border">
              <div class="code-window bg-[#091121]">
                <div class="window-header">
                  <div class="window-dot bg-red-500"></div>
                  <div class="window-dot bg-yellow-500"></div>
                  <div class="window-dot bg-green-500"></div>
                  <span class="ml-2 text-sm text-gray-400 flex items-center gap-2">
                    <i class="fas fa-code"></i>
                    developer.vue
                  </span>
                </div>
                <pre class=" flex items-center justify-center pt-24  ">
          <CardsHero />
                  </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
  
  
  
    </main>
  </template>
  
  <script setup lang="ts">
  
  
  </script>
  
  <style scoped>
  /* Animation for grid pulse */
  @keyframes gridPulse {
  
    0%,
    100% {
      opacity: 0.1;
    }
  
    50% {
      opacity: 0.3;
    }
  }
  
  /* Animation for floating elements */
  @keyframes float {
  
    0%,
    100% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes float-slow {
  
    0%,
    100% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-15px);
    }
  }
  
  /* Gradient text */
  .gradient-text {
    background: linear-gradient(to right, #3b82f6, #10b981);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  /* Code window styling */
  .gradient-border {
    position: relative;
    padding: 1px;
    border-radius: 12px;
    background: linear-gradient(to right, #3b82f6, #10b981);
    box-shadow: 0 0 25px 0 rgba(59, 130, 246, 0.3);
  }
  
  .code-window {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .window-header {
    background: #151b30;
    padding: 10px 15px;
    display: flex;
    align-items: center;
  }
  
  .window-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 6px;
  }
  
  /* Animation classes */
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  
  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  
  .typing-effect {
    position: relative;
  }
  
  .typing-effect::after {
    content: '|';
    animation: typing 1s infinite;
  }
  
  @keyframes typing {
  
    0%,
    100% {
      opacity: 1;
    }
  
    50% {
      opacity: 0;
    }
  }
  </style>