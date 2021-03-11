<template>
    <Navbar />
    <Sidebar />

    <div class="mx-auto w-3/4 md:w-1/2 mb-5">
        <transition name="fade" appear>
            <div v-if="blogs.length > 0" class="mt-10 divide-y">
                <div
                    class="mb-5 pt-5 pl-5 pr-5 pb-2 duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-90 border-2 rounded-md bg-white"
                    v-for="blog in blogs"
                    :key="blog.id"
                >
                    <div class="block md:flex md:justify-between">
                        <div>
                            <img
                                :src="blog.avatar"
                                alt="avatar"
                                class="rounded-full w-10 h-10 inline mr-3"
                            />
                            <div
                                class="mt-5 md:mt-0 inline text-md md:text-lg font-semibold"
                            >
                                {{ blog.author }}
                            </div>
                        </div>

                        <div class="inline">
                            <div class="block md:inline text-sm mb-4 text-bold">
                                {{
                                    formatRelative(
                                        blog.createdOn.toDate(),
                                        date
                                    )
                                }}
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 mb-0 flex justify-between">
                        <div class="inline">
                            <router-link
                                class="text-3xl font-bold"
                                :to="{
                                    name: 'Singlepost',
                                    params: { id: blog.id },
                                }"
                            >
                                {{ blog.title }}
                            </router-link>
                        </div>
                        <div class="flex justify-end inline">
                            <router-link
                                :to="{
                                    name: 'Singlepost',
                                    params: { id: blog.id },
                                }"
                            >
                                <i class="far fa-thumbs-up fa-lg"></i>
                                <div class="ml-1 inline">
                                    {{ blog.likers.length }}
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <router-link
                        class="hidden md:block mt-10"
                        :to="{ name: 'Singlepost', params: { id: blog.id } }"
                    >
                        <p class="truncate">
                            {{ blog.description.substring(0, 100) }}
                        </p>
                    </router-link>
                    <div class="mt-5 flex flex-wrap">
                        <div class="flex flex-wrap">
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
            </div>
            <div v-else class="mt-24 mx-auto w-3/4 md:w-1/3" id="loading-style">
                <div class="text-center"></div>
                <div class="text-center"></div>
                <div class="text-center"></div>
            </div>
        </transition>
    </div>

    <div class="text-center flex justify-center" v-if="User">
        <router-link
            :to="{ name: 'Newform' }"
            class="md:fixed md:z-50 md:bottom-4 md:right-4 md:p-6 rounded-full bg-gray-900 text-white md:m-10 p-2 mb-5 h-20 w-20 flex items-center justify-center"
            ><i class="fas fa-plus fa-2x"></i
        ></router-link>
    </div>
</template>

<script>
import currentUser from "../composables/userNow";
import Navbar from "@/components/Navbar.vue";
import getPosts from "../composables/getPosts";
import { formatRelative } from "date-fns";
import Sidebar from "@/components/Sidebar.vue";
export default {
    name: "Dashboardnavbar",
    components: {
        Navbar,
        Sidebar,
    },
    setup() {
        const { User } = currentUser();
        const date = new Date();
        const { error, loader, blogs } = getPosts();

        loader();

        return {
            User,
            date,
            blogs,
            error,
            formatRelative,
        };
    },
};
</script>

<style scoped>
#loading-style {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    width: 50px;
    height: 50px;
}

#loading-style div {
    width: 15px;
    height: 15px;
    background: purple;
    border-radius: 50%;
    animation: bounce 0.5s ease infinite alternate;
}

#loading-style div:nth-child(2) {
    animation-delay: 0.1s;
    opacity: 0.8;
}

#loading-style div:nth-child(3) {
    animation-delay: 0.2s;
    opacity: 0.6;
}

a.router-link-exact-active {
    border-bottom: solid;
}

.fade-enter-from {
    opacity: 0;
    transform: scale(0.6);
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

.fade-enter-active {
    transition: all 1s ease;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100px);
    }
}
</style>
