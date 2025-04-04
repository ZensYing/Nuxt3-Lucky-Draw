// composables/useTheme.ts
import { ref, onMounted } from 'vue';

export default function useTheme() {
  // Initialize with 'light' as default
  const theme = ref('light');
  
  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    
    // Only manipulate DOM elements when in browser context
    if (process.client) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  // Initialize theme from localStorage only for client-side
  onMounted(() => {
    // Get saved theme or fallback to 'light'
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    setTheme(savedTheme);
  });

  return {
    theme,
    toggleTheme,
    setTheme, // Exposing setTheme can be useful
  };
}