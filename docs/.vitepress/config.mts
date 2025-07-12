import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  description: 'Documentación técnica',
  title: 'SAKAI-TAREAS',
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        miniSearch: {},
      },
    },
    nav: [
      { text: 'Overview', link: 'docs/pages/overview' },
      {
        text: 'Módulos',
        items: [
          {
            text: "Backend",
            link: "docs/pages/backend.md"
          },
          {
            text: 'Frontend',
            items: [
              { text: 'Resumen', link: '/pages/frontend/' },
              { text: 'Estructura', link: '/pages/frontend/estructura' },
              { text: 'Tareas', link: '/pages/frontend/tareas' },
              { text: 'Etiquetas', link: '/pages/frontend/etiquetas' },
              { text: 'Comentarios', link: '/pages/frontend/comentarios' },
              { text: 'Usuarios', link: '/pages/frontend/usuarios' },
              { text: 'Autenticación', link: '/pages/frontend/autenticacion' }
            ]
          }

        ],
      },
    ],
    sidebar: {
      '/docs/pages/': [
        { text: 'Overview', link: '/docs/pages/overview.md' },
        { text: 'Backend', link: '/docs/pages/backend.md' },
        { text: 'Frontend', link: '/docs/pages/frontend.md' }
      ]
    },
  },
});
