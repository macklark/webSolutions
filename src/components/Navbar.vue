<template>
    <header
        class="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg p-7 flex justify-between"
    >
        <h3
            class="font-mono text-xl font-extrabold text-purple-100 cursor-pointer"
            @click="homeRouting"
        >
            webSolutions
        </h3>
        <nav class="space-x-4 xs:hidden lg:inline">
            <div
                class="inline text-white rounded-lg cursor-pointer"
                v-if="!User"
                @click="signUphandler"
            >
                <img
                    src="../assets/btn.png"
                    alt="google"
                    class="w-40 h-10 inline hover:opacity-75 transition duration-500 ease-in-out"
                />
            </div>
            <div
                class="inline p-2 text-white rounded-lg hover:bg-purple-700 transition duration-500 ease-in-out cursor-pointer"
                v-if="User"
                @click="clickHandler"
            >
                Logout
            </div>
            <router-link
                class="inline p-2 text-white rounded-lg hover:bg-purple-700 transition duration-500 ease-in-out"
                :to="{ name: 'About' }"
                >About</router-link
            >
            <router-link
                :to="{ name: 'Profile', params: { id: User.uid } }"
                v-if="User"
            >
                <img
                    :src="User.photoURL"
                    alt="avatar"
                    class="inline rounded-full w-10 h-10"
                />
            </router-link>
        </nav>
        <nav class="xs:inline lg:hidden text-white cursor-pointer">
            <i class="fas fa-bars fa-lg" @click="dropdownHandler"></i>
        </nav>
    </header>
    <div
        class="xs:bg-gray-900 h-screen text-center transition-all 3s orgin-top ease-in-out drop lg:hidden"
        v-show="showDropdown"
    >
        <div
            class="text-white block p-10 hover:bg-gray-700 cursor-pointer"
            v-if="!User"
            @click="signUphandler"
        >
            <i class="fab fa-google"></i>
        </div>
        <div
            class="text-white block p-10 hover:bg-gray-700 cursor-pointer"
            v-if="User"
            @click="clickHandler"
        >
            Logout
        </div>
        <div class="border-b-2 border-gray-500"></div>
        <router-link
            class="text-white block p-10 hover:bg-gray-700"
            :to="{ name: 'About' }"
            >About</router-link
        >

        <div class="mt-10">
            <i
                class="fas fa-times fa-2x text-white cursor-pointer"
                @click="closeDropdown"
            ></i>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import currentUser from "../composables/userNow";
import signUp from "../composables/signUp";
import { firebaseAuth } from "../firebase/config";
export default {
    name: "Navbar",
    setup() {
        const options = reactive([
            { identifier: "Login" },
            { identifier: "Sign up" },
            { identifier: "About" },
        ]);

        const { googleSignup } = signUp();

        const routing = useRouter();

        const { User } = currentUser();

        const showDropdown = ref(false);

        const dropdownHandler = () => {
            showDropdown.value = true;
        };

        const closeDropdown = () => {
            showDropdown.value = false;
        };

        const clickHandler = () => {
            firebaseAuth.signOut().then(() => {
                routing.push({ name: "Dashboard" });
            });
        };

        const signUphandler = async () => {
            await googleSignup();
        };

        const homeRouting = () => {
            routing.push({ name: "Dashboard" });
        };

        return {
            options,
            showDropdown,
            dropdownHandler,
            closeDropdown,
            User,
            clickHandler,
            signUphandler,
            homeRouting,
        };
    },
};
</script>
