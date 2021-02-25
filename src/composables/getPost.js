import { firestoreStorage } from "../firebase/config"
import { ref } from "vue"

const getPost = (id) => {
    const title = ref(null)
    const description = ref(null)
    const error = ref(null)
    const likers = ref([])

    const load = async () => {
        try{
            let res = await firestoreStorage.collection("blogs").doc(id).get()

            if(!res.exists){
                throw Error("Post does not exis")
            }
            title.value = res.data().title
            description.value = res.data().description
        }catch(err){
            error.value = err.message
        }
    }

    return {
        error, load, title, description
    }
}

export default getPost