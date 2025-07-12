import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: 'Documentación técnica de sakai-tareas',
  title: 'Documentación - Sakai Tareas',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        miniSearch: {},
      },
    },
    nav: [
      { text: 'Introducción', link: '/pages/introduccion' },
      { text: 'Arquitectura', link: '/pages/arquitectura' },
      { text: 'Backend', link: '/pages/backend' },
      { text: 'Frontend', link: '/pages/frontend' },
      { text: 'Despliegue', link: '/pages/despliegue' },
      { text: 'FAQ', link: '/pages/faq' }
    ],
    sidebar: {
      '/pages/': [
        { text: 'Introducción', link: '/pages/introduccion.md' },
        { text: 'Arquitectura', link: '/pages/arquitectura.md' },
        { text: 'Backend', link: '/pages/backend.md' },
        { text: 'Frontend', link: '/pages/frontend.md' },
        { text: 'Despliegue', link: '/pages/despliegue.md' },
        { text: 'FAQ', link: '/pages/faq.md' }
      ]
    },
  },
});
