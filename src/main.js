import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css"
import { firebaseAuth } from "./firebase/config"

let starter

firebaseAuth.onAuthStateChanged(() => {
    if(!starter){
        starter = createApp(App).use(router).mount('#app')
    }
})
