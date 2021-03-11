<template>
    <Navbar />
    <div class="mt-10 container mx-auto px-4">
        <div class="grid grid-cols-3">
            <div v-if="title" class="col-span-2">
                <p class="text-4xl font-bold">{{ title }}</p>
                <p class="text-sm font-normal text-gray-400 mt-2">
                    {{ formatRelative(createdOn.toDate(), date) }}
                </p>
                <p class="mt-10">{{ description }}</p>
                <div
                    class="mt-5 mb-5 border-t-2 p-10 pl-0 pt-2"
                    v-for="comment in comments"
                    :key="comment.comment"
                >
                    <div>
                        <img
                            :src="comment.avatar"
                            alt="avatar"
                            class="rounded-full w-7 h-7 inline mr-3"
                        />
                        <div
                            class="mt-5 md:mt-0 inline text-md md:text-md font-semibold"
                        >
                            {{ comment.author }}
                        </div>
                        <div class="inline text-sm text-gray-500 ml-2">
                            {{ formatRelative(comment.created.toDate(), date) }}
                        </div>
                        <div class="flex justify-end" v-if="User">
                            <i
                                class="far fa-medal fa-lg cursor-pointer"
                                @click="
                                    firestoreStorage
                                        .collection('comments')
                                        .doc(comment.id)
                                        .update({ creditedBy: author })
                                "
                                v-if="comment.creditedBy.length == 0"
                            ></i>
                            <i class="fas fa-medal fa-lg" v-else></i>
                        </div>
                    </div>
                    <VueShowdown
                        :markdown="comment.comment"
                        flavor="github"
                        class="mt-5 flex flex-wrap tracking-wide"
                    />
                </div>
                <div class="text-right" v-if="User">
                    <button
                        @click="postHandler"
                        class="bg-purple-500 px-4 py-2 text-white hover:bg-white hover:text-purple-500"
                    >
                        Post
                    </button>
                </div>
                <div class="mt-5">
                    <vue-simplemde
                        ref="markdownEditor"
                        v-if="User"
                        :highlight="true"
                        class="overflow-auto"
                        v-model="content"
                    />
                </div>
            </div>
            <div v-else class="mt-24 mx-auto w-3/4 md:w-1/3" id="loading-style">
                <div class="text-center"></div>
                <div class="text-center"></div>
                <div class="text-center"></div>
            </div>
            <div class="text-center p-20 flex justify-center">
                <div v-if="User" class="fixed">
                    <div @click="submitHandler">
                        <i
                            class="fas fa-thumbs-up fa-lg cursor-pointer"
                            v-if="likers.includes(User.email)"
                        ></i>
                        <i
                            class="far fa-thumbs-up fa-lg cursor-pointer"
                            v-else
                        ></i>
                        <div>{{ likers.length }}</div>
                    </div>
                    <div
                        v-if="User.displayName == author"
                        class="hover:text-red-500"
                    >
                        <i
                            class="fas fa-trash-alt fa-lg text-red-600 mt-10 cursor-pointer p-3 hover:bg-red-300 rounded-full duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-90"
                            @click="deleteHandler"
                        ></i>
                        <span class="font-serif">delete</span>
                    </div>
                </div>
                <div v-else>
                    <i
                        class="far fa-thumbs-up fa-lg cursor-pointer mt-5 text-gray-600"
                    ></i>
                    <div class="mt-5">Authenticate first !</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import currentUser from "../composables/userNow";
import Navbar from "@/components/Navbar.vue";
import getPost from "../composables/getPost";
import { useRoute, useRouter } from "vue-router";
import { formatRelative } from "date-fns";
import { firestoreStorage, union, remove, timer } from "../firebase/config";
import VueSimplemde from "vue-simplemde";
import hljs from "highlight.js";
import { ref } from "vue";
import getComment from "../composables/getComment";

export default {
    name: "Singlepost",
    props: ["id"],
    components: {
        Navbar,
        VueSimplemde,
    },
    setup(props) {
        const routing = useRoute();
        const route = useRouter();
        const {
            load,
            title,
            description,
            likers,
            createdOn,
            author,
            creditedBy,
        } = getPost(routing.params.id);
        const { User } = currentUser();
        const date = new Date();
        const content = ref("");
        const { comments, loader } = getComment(routing.params.id);

        load();
        window.hljs = hljs;

        loader();
        console.log(comments);

        const submitHandler = async () => {
            const res0 = {
                likers: union(User._rawValue.email),
            };

            const res1 = {
                likers: remove(User._rawValue.email),
            };

            if (likers.value.includes(User._rawValue.email)) {
                const post0 = await firestoreStorage
                    .collection("blogs")
                    .doc(props.id)
                    .update(res1);
            } else {
                const post = await firestoreStorage
                    .collection("blogs")
                    .doc(props.id)
                    .update(res0);
            }
        };

        const postHandler = async () => {
            const res2 = {
                comment: content.value,
                authorEmail: User._rawValue.email,
                post: props.id,
                author: User._rawValue.displayName,
                avatar: User._rawValue.photoURL,
                created: timer(),
                creditedBy: [],
            };
            if (content.value != "") {
                const morePost = await firestoreStorage
                    .collection("comments")
                    .add(res2);
            }
            content.value = "";
        };

        const deleteHandler = () => {
            firestoreStorage.collection("blogs").doc(props.id).delete();
            route.push({ name: "Dashboard" });
        };

        return {
            User,
            deleteHandler,
            submitHandler,
            title,
            description,
            likers,
            date,
            createdOn,
            formatRelative,
            content,
            postHandler,
            comments,
            author,
            firestoreStorage,
            creditedBy,
        };
    },
};
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";
@import "~highlight.js/styles/atom-one-dark.css";

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

@keyframes bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-100px);
    }
}
</style>
