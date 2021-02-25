import { ref } from "vue"
import { firestoreStorage } from "../firebase/config"

const getPosts = () => {
    const error = ref(null)
    const blogs = ref([])

    const loader = async () => {
        try{
            await firestoreStorage.collection("blogs").orderBy("createdOn", "desc").onSnapshot((snap) => {
                let docs = snap.docs.map(doc => {
                    return {
                        ...doc.data(), id : doc.id
                    }
                })
                blogs.value = docs
            })
        }catch(err){
            error.value = err.message
            console.log(error.value)
        }
    }

    return {error, loader, blogs}
}

export default getPosts