<template>
  <Navbar />
  <Sidebar />
  <router-link
    :to="{ name: 'Newform' }"
    class="fixed z-50 bottom-4 right-4 p-6 rounded-full bg-gray-900 text-white block m-10"
    v-if="User"
    ><i class="fas fa-plus fa-2x"></i
  ></router-link>
  <div class="mx-auto w-3/4 md:w-1/3">
    <div class="mt-10" v-if="User">
      <router-link :to="{ name: 'Dashboard' }" class="mr-5 pb-2"
        >All</router-link
      >
      <router-link :to="{ name: 'yourblogs' }" class="mr-5 pb-2"
        >Your posts</router-link
      >
    </div>
    <div v-if="youBlogs.length">
      <div
        class="mb-5 shadow-md p-20 mt-10 pt-5 pl-5 pr-5 pb-5"
        v-for="blog in youBlogs"
        :key="blog.id"
      >
        <!-- <p v-if = "User">{{ User.displayName }}</p> -->
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
</template>

<script>
import getYourposts from "../composables/getYourposts";
import currentUser from "../composables/userNow";
import Navbar from "@/components/Navbar.vue";
import { formatRelative } from "date-fns";
import Sidebar from "@/components/Sidebar.vue";
export default {
  name: "Yourblogs",
  setup() {
    const { error, yourBlogsloader, youBlogs, noData } = getYourposts();
    const User = currentUser();
    const date = new Date();

    yourBlogsloader(User.User._rawValue.X.X);

    return {
      youBlogs,
      User,
      formatRelative,
      date,
      noData
    };
  },
  components: { Navbar, Sidebar }
};
</script>

<style scoped>
a.router-link-exact-active {
  border-bottom: solid;
}
</style>
