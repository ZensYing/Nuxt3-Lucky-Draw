// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  build: {
    transpile: ['monaco-editor']
  },
  ssr:false,
  app: {
    head: {
      title: 'Soun Sorahta - Full Stack Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Soun Sorahta - Full Stack Developer, Web Developer, Software Developer, Programmer, and Freelancer based in Phnom Penh, Cambodia.",
        },
        {
          name: 'keywords',
          content:
            'starter template,',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hanuman:wght@100;300;400;700;900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/icon-green.svg' },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-4PFB0M8P0C",
          async: true,
        },
        {
          hid: 'gtmHead',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-4PFB0M8P0C');
          `,
        },
      ],  
    },
  },
  
  css: ['~/assets/css/main.css', '~/assets/css/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  
  vite: {
    optimizeDeps: {
      include: ['leaflet']
    }
  },
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL ,
      NEST_API_BASE_URL: process.env.NEST_API_BASE_URL ,
      API_TC_BASE_URL: process.env.API_TC_BASE_URL

    },
  },
  
  plugins: ['~/plugins/iconify.js']
});
