<template>
    <transition name="swipe" appear>
        <div
            class="hidden md:block md:p-10 md:w-1/4 md:h-screen md:fixed md:ml-10 md:pl-20"
        >
            <h3
                class="font-mono text-xl font-extrabold text-purple-100 cursor-pointer"
            >
                webSolutions
            </h3>
            <div class="text-xl md:ml-0 font-bold mt-10">Topics</div>
            <form>
                <input
                    class="mt-5 h-8 text-black ring-2 ring-offset-indigo-700 pl-2"
                    v-model="searchHandler"
                    @keyup="fillHandler"
                    placeholder="Search..."
                />
            </form>
            <div
                class="grid grid-cols-1 text-xl overflow-y-auto mt-5"
                v-for="topic in topics"
                :key="topic"
            >
                <div class="text-left p-3 text-lg">
                    {{ topic.topic }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ref } from "vue";
import getTopics from "../composables/getTopics";
export default {
    name: "Sidebar",
    setup() {
        const { topics, topicLoader } = getTopics();
        const searchHandler = ref(null);

        topicLoader();

        const fillHandler = () => {
            console.log(searchHandler.value);
        };

        return {
            searchHandler,
            fillHandler,
            topics,
        };
    },
};
</script>

<style scoped>
.swipe-enter-from {
    opacity: 0;
    transform: translateX(-100px);
}

.swipe-enter-to {
    opacity: 1;
    transform: translateX(0px);
}

.swipe-enter-active {
    transition: all 1s ease;
}
</style>
