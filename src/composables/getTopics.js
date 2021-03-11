import { ref } from "vue";
import { firestoreStorage } from "../firebase/config";

const getTopics = () => {
    const topics = ref(null);
    const error = ref(null);

    const topicLoader = async () => {
        try {
            const res = await firestoreStorage.collection("topics").get();
            if (!res) {
                error.value = "something error occured!";
            }

            topics.value = res.docs.map((doc) => {
                return {
                    ...doc.data(),
                };
            });
            console.log(topics.value);
        } catch (err) {
            error.value = err.message;
        }
    };

    return {
        topics,
        topicLoader,
    };
};

export default getTopics;
