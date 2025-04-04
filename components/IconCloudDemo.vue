<template>
  <div class="relative w-full h-[200px] flex items-center justify-center mb-10">
    <div class="animate-float">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="150" height="150">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(59, 130, 246, 0.5)" stroke-width="2" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(124, 58, 237, 0.5)" stroke-width="2" />
        <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(236, 72, 153, 0.5)" stroke-width="2" />
        <text x="50" y="55" font-size="12" text-anchor="middle" fill="white">SKILLS</text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>