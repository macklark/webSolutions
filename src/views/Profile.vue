<template>
    <Navbar />
    <div class = "container mx-auto">
        <div class = "mt-10 flex justify-center">
            <div class = "p-10 shadow-md bg-white pt-10" v-if = "profile">
                <img :src = "profile.avatar" alt = "avatar" class = "rounded-full w-1/2 mx-auto">
                <div class = "mt-5 flex justify-between">
                    <p class = "text-xl font-serif font-bold inline">{{ profile.userName }}</p>
                </div>
                <div class = "mt-5 flex justify-between">
                    <p class = "text-xl font-serif font-bold">{{ profile.email }}</p>
                </div>
            </div>
        </div>
          <div class="mx-auto w-3/4 md:w-4/5 mb-10">

    <div v-if="youBlogs.length" class = "mt-5 border-2 divide-y rounded-md bg-white">
      <div
        class="p-20 pt-5 pl-5 pr-5 pb-5"
        v-for="blog in youBlogs"
        :key="blog.id"
      >
        <div class="flex justify-between">
          <div class="text-2xl font-bold inline">
            {{ blog.title }}
          </div>
          <div class="inline">
            <div class="inline text-xs">
              {{ formatRelative(blog.createdOn.toDate(), date) }}
            </div>
          </div>
        </div>
        <div class="text-sm">Posted by {{ blog.author }}</div>
        <div class="mt-10">
          <p class="truncate">
            {{ blog.description.substring(0, 100) }}
          </p>
        </div>
        <div class="mt-5">
          <div
            class="hidden bg-purple-200 border-purple-400 border-2 rounded-full px-2 py-1 m-2 md:inline"
            v-for="tag in blog.tags"
            :key="tag"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>

    <div v-else-if = "noData" class="mt-24 mx-auto w-3/4 md:w-1/3" id="loading-style">
      <div class="mt-10 text-center text-lg">Your feed is empty !</div>
    </div>
  </div>
    </div>
</template>

<script>
import getProfile from "../composables/getProfile"
import Navbar from "@/components/Navbar.vue"
import currentUser from "../composables/userNow";
import { useRoute } from "vue-router"
import getYourposts from "../composables/getYourposts"
import { formatRelative } from "date-fns";
    export default{
        name : "Profile",
        setup(){
            const routing = useRoute()
            const { profile, load } = getProfile(routing.params.id)
            const { yourBlogsloader, youBlogs, noData } = getYourposts()
            const User = currentUser();
            const date = new Date()

            load()
            yourBlogsloader(User.User._rawValue.X.X)

            return{
                profile, youBlogs, User, noData, formatRelative,date
            }
        },
        components : {
            Navbar
        }
    }
</script>