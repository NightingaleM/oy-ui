import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import './index.css'
import {createWebHashHistory,createRouter} from "vue-router";
// @ts-ignore
import HelloWrod from './components/HelloWorld.vue'
import OYY from './components/OYY.vue'
const history = createWebHashHistory()
const router = createRouter({
  history:history,
  routes:[
    {path:'/',component:HelloWrod},
    {path:'/o',component:OYY},
  ]
})


const app = createApp(App)
app.use(router)
app.mount('#app')

