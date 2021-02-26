<template>
  <Navbar />
  <div class="container mx-auto flex justify-center">
    <div class="p-60 h-screen md:w-full pt-10 mx-auto">
      <form @submit.prevent = "submitHandler">
        <label
          class="inline-block mb-2 text-md font-normal text-gray-700 uppercase"
          >Title</label
        >
        <input
          class="block mb-10 h-8 w-full border-b-2 outline-none p-2"
          v-model="title"
          type="text"
          required
          spellcheck = "false"
          maxlength = "30"
        />
        <label
          class="inline-block mb-2 text-md font-normal text-gray-700 uppercase"
          >Meta</label
        >
        <textarea
          class="block mb-10 w-full border-b-2 outline-none p-2 h-32"
          v-model="description"
          required
          spellcheck = "false"
        ></textarea>
        <label
          class="inline-block mb-4 text-md font-normal text-gray-700 uppercase"
          >Tags</label
        >
        <input
          class="block mb-10 h-8 w-full border-b-2 outline-none p-2"
          v-model="tag"
          type="text"
          @keydown.enter.prevent="tagHandler"
        />
        <div
          class="inline px-6 py-3 m-2 bg-purple-200 border-purple-400 border-2 rounded-full"
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </div>
        <div class="md:text-center">
          <button
            class="bg-indigo-500 px-6 py-2 rounded shadow-inner text-white opacity-100 hover:bg-indigo-400 transition ease-in-out duration-500 mt-10 text-2xl"
          >
            Post
          </button>
          <button
            class="bg-red-500 px-6 ml-5 py-2 rounded shadow-inner text-white opacity-100 hover:bg-red-400 transition ease-in-out duration-500 mt-10 text-2xl" @click.prevent = "clearHandler"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { reactive, ref } from "vue";
import { firestoreStorage, timer } from '../firebase/config';
import { useRouter } from "vue-router"
import currentUser from "../composables/userNow";

export default {
  name: "Newform",
  components: { Navbar },
  setup() {
    const title = ref(null);
    const description = ref(null);
    const tag = ref(null);
    const tags = reactive([]);
    const routing = useRouter()
    const { User } = currentUser()

    const tagHandler = () => {
      if (!tags.includes(tag.value) && !tag.value == "") {
        tag.value = tag.value.replace(/\s/, "");
        tags.push(tag.value);
      }
      tag.value = "";
    };

    const submitHandler = async () => {
      const res = {
        title : title.value,
        description : description.value,
        tags : tags,
        createdOn : timer(),
        author : User._rawValue.displayName,
        userId : User._rawValue.ba.X,
        likers : []
      }

      const post = await firestoreStorage.collection("blogs").add(res)
      routing.push({ name : "Dashboard" })
    }

    const clearHandler = () => {
        title.value = ""
        description.value = ""
        tag.value = ""
        tags.length = 0
        routing.push({ name : "Dashboard" })
    }

    return { title, description, tag, tags, tagHandler, clearHandler, submitHandler, User };
  },
};
</script>