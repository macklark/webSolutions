<template>
    <router-view></router-view>
</template>

<script>
import About from "@/views/About.vue";
import Dashboard from "@/views/Dashboard.vue";
import Notauth from "@/views/Notauth.vue";
import Newform from "@/views/Newform.vue";
import Singlepost from "@/views/Singlepost.vue";
import Profile from "@/views/Profile.vue";
export default {
    name: "App",
    components: { About, Dashboard, Notauth, Newform, Singlepost, Profile },
};
</script>
