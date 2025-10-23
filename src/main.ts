import { createApp } from 'vue'
import { router } from './router'
import { createDiscreteApi, NConfigProvider, darkTheme } from 'naive-ui'
import { themeOverrides } from './theme'
import './style.css'
import './styles/theme.css'
import App from './App.vue'

createApp(App)
  .use(router)
  .component('NConfigProvider', NConfigProvider)
  .mount('#app')

createDiscreteApi([], { configProviderProps: { theme: darkTheme, themeOverrides } })
