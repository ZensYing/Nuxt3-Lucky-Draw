<template>
    <div class="loading-container">
      <!-- Background gradient animation -->
      <div class="gradient-bg"></div>
      
      <!-- Tech-inspired animated logo -->
      <div class="tech-auto-logo">
        <div class="circuit-lines">
          <div v-for="i in 5" :key="`line-${i}`" :class="`line line-${i}`"></div>
        </div>
        
        <div class="center-circle">
          <div class="pulse-ring"></div>
          <div class="inner-circle">
            <div class="gear-animation">
              <div class="gear gear-large"></div>
              <div class="gear gear-small"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading text with language support -->
      <div class="loading-text">
        <h3 class="text-2xl font-bold text-white mb-2">
          {{ locale === 'en' ? 'Tech & Auto Expo 2025' : 'ពិព័រណ៍បច្ចេកវិទ្យា & យានយន្ត ២០២៥' }}
        </h3>
        <div class="loading-dots">
          <span v-for="i in 3" :key="`dot-${i}`" :class="`dot dot-${i}`"></span>
        </div>
        <p class="text-white opacity-80 mt-4">
          {{ locale === 'en' ? 'Loading experience' : 'កំពុងផ្ទុក' }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import gsap from 'gsap';
  
  const { locale } = useI18n();
  const tl = ref(null);
  
  onMounted(() => {
    // Initialize the GSAP timeline
    tl.value = gsap.timeline({ repeat: -1 });
    
    // Animate the circuit lines
    tl.value.fromTo('.line', 
      { width: 0, opacity: 0.3 },
      { width: '100%', opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.inOut' }
    );
    
    // Rotate the gears continuously
    gsap.to('.gear-large', { 
      rotation: 360, 
      duration: 8, 
      repeat: -1, 
      ease: 'linear' 
    });
    
    gsap.to('.gear-small', { 
      rotation: -360, 
      duration: 5, 
      repeat: -1, 
      ease: 'linear' 
    });
    
    // Animate the loading dots
    gsap.to('.dot', {
      y: -10,
      duration: 0.5,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  });
  
  onUnmounted(() => {
    // Clean up animations when component is unmounted
    if (tl.value) {
      tl.value.kill();
    }
    gsap.killTweensOf(['.gear-large', '.gear-small', '.dot']);
  });
  </script>
  
  <style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0f172a;
    z-index: 9999;
    overflow: hidden;
  }
  
  .gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #1e40af, #7e22ce);
    opacity: 0.7;
    animation: gradientShift 8s ease infinite;
  }
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
      opacity: 0.6;
    }
    50% {
      background-position: 100% 50%;
      opacity: 0.8;
    }
    100% {
      background-position: 0% 50%;
      opacity: 0.6;
    }
  }
  
  .tech-auto-logo {
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
  }
  
  .circuit-lines {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .line {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, transparent, #60a5fa, transparent);
    opacity: 0;
  }
  
  .line-1 {
    top: 20%;
    left: 0;
    width: 100%;
  }
  
  .line-2 {
    top: 40%;
    left: 0;
    width: 80%;
  }
  
  .line-3 {
    top: 60%;
    right: 0;
    width: 60%;
  }
  
  .line-4 {
    top: 80%;
    left: 20%;
    width: 70%;
  }
  
  .line-5 {
    top: 90%;
    right: 10%;
    width: 50%;
  }
  
  .center-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(30, 64, 175, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  
  .pulse-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #60a5fa;
    animation: pulse 2s ease-out infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.9);
      opacity: 1;
    }
    70% {
      transform: scale(1.3);
      opacity: 0;
    }
    100% {
      transform: scale(0.9);
      opacity: 0;
    }
  }
  
  .inner-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
  }
  
  .gear-animation {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .gear {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.8);
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
  
  .gear-large {
    width: 60px;
    height: 60px;
    top: 10px;
    left: 10px;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3Cpath d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'%3E%3C/path%3E%3C/svg%3E");
  }
  
  .gear-small {
    width: 40px;
    height: 40px;
    bottom: 10px;
    right: 10px;
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3Cpath d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'%3E%3C/path%3E%3C/svg%3E");
  }
  
  .loading-text {
    text-align: center;
    position: relative;
    z-index: 3;
  }
  
  .loading-dots {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 6px;
  }
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 50%;
    display: inline-block;
  }
  </style>