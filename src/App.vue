<template>
    <router-view></router-view>
</template>

<script>
import About from "@/views/About.vue"
import Dashboard from "@/views/Dashboard.vue"
import Notauth from "@/views/Notauth.vue"
import Newform from "@/views/Newform.vue"
import Yourblogs from "@/views/Yourblogs.vue"
    export default{
        name : "App",
        components : {About, Dashboard, Notauth, Yourblogs, Newform}
    }
</script>
