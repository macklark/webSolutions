import { firestoreStorage } from "../firebase/config"
import { ref } from "vue"

const getPost = (id) => {
    const title = ref(null)
    const description = ref(null)
    const error = ref(null)
    const likers = ref([])
    const createdOn = ref(null)

    const load = async () => {
        try{
            let res = await firestoreStorage.collection("blogs").doc(id).onSnapshot((doc) => {
                title.value = doc.data().title
                description.value = doc.data().description
                likers.value = doc.data().likers
                createdOn.value = doc.data().createdOn
            })

            if(!res.exists){
                throw Error("Post does not exist")
            }

        }catch(err){
            error.value = err.message
        }
    }

    return {
        error, load, title, description, likers, createdOn
    }
}

export default getPost
