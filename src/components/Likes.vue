<template>
    <div class = "text-center md:flex md:justify-end" v-if = "doesUser">
            <div @click = "submitHandler">
                <i class="fas fa-thumbs-up fa-lg cursor-pointer" v-if = "doesLike"></i>
                <i class="far fa-thumbs-up fa-lg cursor-pointer" v-else></i>
                <div class = "ml-1 inline">{{ numberOflikes }}</div>
            </div>
    </div>
</template>

<script>
import { ref } from 'vue'
// import { firestoreStorage } from "../firebase/config"
    export default{
        name : "Likes",
        setup(){
            const doesLike = ref(false)
            const numberOflikes = ref(0)

            const submitHandler = async () => {
                if(doesLike.value == false){
                    doesLike.value = true
                    numberOflikes.value = numberOflikes.value + 1
                }else if(doesLike.value == true){
                    doesLike.value = false
                    numberOflikes.value = numberOflikes.value - 1
                }
                
                // const res = {
                //     doesLike : doesLike.value
                // }

                // const post = await firestoreStorage.collection("blogs").add(res)
                // console.log(post.id)
            }
            return {
                doesLike,
                numberOflikes,
                submitHandler
            }
        },
        props : [ "doesUser" ]
    }
</script>
