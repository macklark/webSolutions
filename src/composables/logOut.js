import { firebaseAuth } from "../firebase/config";
import { ref } from "vue";

const error = ref(null);

const logoutStatus = async () => {
  error.value = null;
  try {
    await firebaseAuth.signOut();
  } catch (err) {
    error.value = err.message;
  }
};

const logOut = () => {
  return {
    error,
    logoutStatus,
  };
};

export default logOut;
