export const useI18nConfig = () => {
  // Retrieve the saved locale from localStorage or default to 'km'
  const savedLocale = process.client ? localStorage.getItem('locale') || 'km' : 'km';

  // Function to set the font class on the <html> tag
  const setFontClass = (locale: string) => {
    if (process.client) {
      const html = document.documentElement;
      if (locale === 'km') {
        html.classList.add('kantumruy-pro');
        html.classList.remove('roboto');
      } else {
        html.classList.add('roboto');
        html.classList.remove('kantumruy-pro');
      }
    }
  };

  // Apply the font class on initialization
  if (process.client) {
    setFontClass(savedLocale);
  }

  return {
    strategy: 'prefix_and_default',
    defaultLocale: 'km',
    locales: [
      { code: 'en', name: 'English', iso: 'en-US' },
      { code: 'km', name: 'Khmer', iso: 'km-KH' },
    ],
    vueI18n: {
      legacy: false,
      globalInjection: true,
      silentTranslationWarn: true,
      locale: savedLocale, // Set the saved locale or fallback to 'km'
      fallbackLocale: 'km', // Fallback locale
    },
    setFontClass, // Export the function for use in other parts of the app
  };
};