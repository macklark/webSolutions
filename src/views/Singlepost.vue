<template>
    <Navbar />
    <div class = "mt-10 container mx-auto px-4">
        <div class = "grid grid-cols-3 grid-rows-4">
            <div v-if = "title" class = "col-span-2">
                <p class = "text-4xl font-bold">{{ title }}</p>
                <p class = "mt-10">{{ description }}</p>
            </div>
            <div v-else class="mt-24 mx-auto w-3/4 md:w-1/3" id="loading-style">
                <div class="text-center"></div>
                <div class="text-center"></div>
                <div class="text-center"></div>
            </div>
                <div class = "text-center p-20 row-span-4">
                    <!-- <Likes :doesUser = "User" :postId = "thePost" /> -->
                    <div v-if = "User">
                        <div @click = "submitHandler">
                        <i class="fas fa-thumbs-up fa-lg cursor-pointer" v-if = "likers.includes(User.displayName)"></i>
                        <i class="far fa-thumbs-up fa-lg cursor-pointer" v-else></i>
                        <div class = "ml-1 inline">{{ likers.length }}</div>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import currentUser from "../composables/userNow"
import Navbar from "@/components/Navbar.vue"
import getPost from "../composables/getPost"
import { useRoute } from "vue-router"
import { ref } from "vue"
import { firestoreStorage, union } from '../firebase/config'
    export default{
        name : "Singlepost",
        props : ["id"],
        components: {
            Navbar
        },
        setup(props){
            const routing = useRoute()
            const {  error, load, title, description, likers } = getPost(routing.params.id)
            const { User } = currentUser()
            const doesLike = ref(false)
            const numberOflikes = ref(0)

            load()

            const submitHandler = async () => {
                if(doesLike.value == false){
                    doesLike.value = true
                    numberOflikes.value = numberOflikes.value + 1
                }else if(doesLike.value == true){
                    doesLike.value = false
                    numberOflikes.value = numberOflikes.value + 1
                }

                const res0 = {
                    "likers" : union(User._rawValue.displayName)
                }
                
                // const res1 = {
                //     "likers" : remove(User._rawValue.displayName)
                // }

                const post = await firestoreStorage.collection("blogs").doc(props.id).update(res0)


                    // const post0 = await firestoreStorage.collection("blogs").doc(props.id).update(res1)

                console.log("Done")
            }
            

            return { title, description, User, submitHandler, doesLike, likers }
        }
    }
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

    @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100px);
        }
    }
</style>