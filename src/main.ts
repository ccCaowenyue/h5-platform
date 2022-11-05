import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import 'remixicon/fonts/remixicon.css'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

// import './assets/index.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3DraggableResizable)
app.mount('#app')
