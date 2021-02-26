<template>
    <div class = "container mx-auto md:flex justify-center">
        <div class = "bg-gray-200 text-center p-20 mt-20 shadow-md rounded md:w-1/2">
            <h3 class = "text-center">Please authenticate !</h3>
            <!-- <div class = "mt-5">
                <div class = "inline text-blue-500 hover:underline cursor-pointer" @click = "redirectHandler">Login</div>
                <div class = "inline">  |  </div>
                <div class = "inline text-blue-500 hover:underline cursor-pointer" @click = "anotherRedirectHandler">Sign up</div>
            </div> -->
            <div class = "text-center mt-2 text-blue-500 hover:underline cursor-pointer" @click = "andAnotherRedirectHandler">Home</div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router"
    export default{
        name : 'Notauth',
        setup(){
            const routing = useRouter()
            // const redirectHandler = () => {
            //     routing.push({ name : 'Login' })
            // }
            // const anotherRedirectHandler = () => {
            //     routing.push({ name : 'Signup' })
            // }
            const andAnotherRedirectHandler = () => {
                routing.push({ name : 'Dashboard' })
            }
            return {
                // redirectHandler,
                // anotherRedirectHandler,
                andAnotherRedirectHandler
            }
        }
    }
</script>