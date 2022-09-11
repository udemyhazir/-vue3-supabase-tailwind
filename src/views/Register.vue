<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
      <div v-if="errorMsg" class="mb-10 p-4 rounded-md bg-light-grey">
        <p class="text-red-500">{{errorMsg}}</p>
      </div>

      <form @submit.prevent="register" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
        <h1 class="text-3xl text-at-light-green mb-4">Üye Olma Sayfası</h1>

        <div class="flex flex-col mb-2">
          <label for="email" class="mb-1 text-sm text-at-light-green">Email:</label>
          <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="email" v-model="email" />
        </div>

        <div class="flex flex-col mb-2">
          <label for="password" class="mb-1 text-sm text-at-light-green">Parola:</label>
          <input type="password" required class="p-2 text-gray-500 focus:outline-none" id="password" v-model="password" />
        </div>

        <div class="flex flex-col mb-2">
          <label for="confirmPassword" class="mb-1 text-sm text-at-light-green">Parola Tekrarı:</label>
          <input type="password" required class="p-2 text-gray-500 focus:outline-none" id="confirmPassword" v-model="confirmPassword" />
        </div>

        <button type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-white hover:bg-white hover:text-at-light-green">Üye Ol</button>

        <router-link class="text-sm mt-6 text-center" :to="{name:'Login'}">Zaten üyeyseniz <span class="text-at-light-orange">Giriş yapınız</span></router-link>
      </form>
  </div>
</template>

<script>

import {ref} from 'vue'
import {supabase} from '../supabase/init'
import {useRouter} from 'vue-router'
export default {
  name: "register",
  setup() {

    const email=ref(null)
    const password=ref(null)
    const confirmPassword=ref(null)
    const errorMsg=ref(null)

    const router=useRouter();

    const register=async ()=>{

      if(password.value=== confirmPassword.value){
        try {
          const {error}=await supabase.auth.signUp({
            email:email.value,
            password:password.value
          })

          if(error) throw error;
          router.push({name:'Home'})
        } catch (error) {
          errorMsg.value=error.message
         
          
          setTimeout(()=>{
            errorMsg.value=null
          },5000)
        }
      }

      errorMsg.value='HATA: Parolalar Eşleşmedi'
      setTimeout(()=>{
        errorMsg.value=null
      },5000)

    }
   

    return {email,password,confirmPassword,errorMsg,register};
  },
};
</script>
