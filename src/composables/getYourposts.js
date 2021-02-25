import { ref } from "vue"
import { firestoreStorage } from "../firebase/config"

const getYourposts = () => {
    const error = ref(null)
    const youBlogs = ref([])
    const noData = ref(null)

    const yourBlogsloader = async (id) => {
        try{
            const res = await firestoreStorage.collection("blogs").where("userId", "==", id).get()
            if (!res){
                noData.value = false
            }else{
                noData.value = true
            }

            youBlogs.value = res.docs.map(doc => {
                return {
                    ...doc.data(), id : doc.id
                }
            })
        }catch(err){
            error.value = err.message
        }
    }

    return {error, yourBlogsloader, youBlogs, noData}
}

export default getYourposts