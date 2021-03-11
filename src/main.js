import { createApp } from "vue";
import { VueShowdownPlugin } from "vue-showdown";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { firebaseAuth } from "./firebase/config";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";

let starter;

firebaseAuth.onAuthStateChanged(() => {
    if (!starter) {
        starter = createApp(App)
            .use(router)
            .use(VueShowdownPlugin, {
                options: {
                    emoji: true,
                },
            })
            .component("vue-simplemde", VueSimplemde)
            .mount("#app");
    }
});
