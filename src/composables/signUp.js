import { firebaseAuth, provider } from "../firebase/config"
import { ref } from "vue"

const errorS = ref(null)

const googleSignup = async () => {
    errorS.value = null
    try{
        const res = await firebaseAuth.signInWithPopup(provider)
        errorS.value = null
        if(!res){
            throw new Error("Something went wrong!")
        }
    }catch(err){
        errorS.value = err.message
    }
}

const signUp = () => {
    return {
        errorS ,
        googleSignup
    }
}

export default signUp