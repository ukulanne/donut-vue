/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)
/*
const app = createApp({
  template: '#app-template',
   data: () => ({
     panda: "panda",
     user: {
      initials: 'AS',
      fullName: 'Anne Summers',==
      email: 'anne.summers@dunkin.com',
    },
    tab: null,
  }),
})
*/
registerPlugins(app)

app.mount('#app')
