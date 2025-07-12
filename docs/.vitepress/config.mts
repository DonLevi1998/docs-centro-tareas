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
            text: "Frontend",
            link: "docs/pages/frontend.md"
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
