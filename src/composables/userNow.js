import { firebaseAuth } from "../firebase/config"
import { ref } from 'vue'

const User = ref(firebaseAuth.currentUser)

firebaseAuth.onAuthStateChanged(user => {
    User.value = user
})

const currentUser = () => {
    return { User }
}

export default currentUser