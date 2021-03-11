import { firestoreStorage } from "../firebase/config";
import { ref } from "vue";

const getComment = (id) => {
    const comments = ref([]);
    const error = ref(null);

    const loader = async () => {
        try {
            let res = await firestoreStorage
                .collection("comments")
                .where("post", "==", id)
                .orderBy("created")
                .onSnapshot((snap) => {
                    let docs = snap.docs.map((doc) => {
                        return {
                            ...doc.data(),
                            id: doc.id,
                        };
                    });
                    comments.value = docs;
                });

            if (!res.exists) {
                throw Error("comment does not exist !");
            }
        } catch (err) {
            error.value = err.message;
        }
    };

    return {
        comments,
        loader,
        error,
    };
};

export default getComment;
