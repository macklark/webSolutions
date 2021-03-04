import { firestoreStorage } from "../firebase/config"
import { ref } from "vue"

const getProfile = (id) => {
    const profile = ref(null)
    const error = ref(null)

    const load = async () => {
        try{
            const res = await firestoreStorage.collection("users").doc(id).get()
            if(!res){
                error.value = "something error occured!"
            }

            profile.value = res.data()
            console.log(profile.value)
    

        }catch(err){
            error.value = err.message
        }

    }

    return{
        profile, load
    }
}

export default getProfile
