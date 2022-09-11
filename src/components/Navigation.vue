<template>
  <header class="bg-at-light-orange text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img src="../assets/images/dumbbell-light.png" alt="" class="w-14" />
        <h1 class="text-lg">AOS Workout</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-6">
        <router-link class="cursor-pointer" :to="{name:'Home'}">Anasayfa</router-link>
        <router-link v-if="user" class="cursor-pointer" :to="{name:'Create'}">Oluştur</router-link>
        <router-link v-if="!user" class="cursor-pointer" :to="{name:'Login'}">Giriş</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Çıkış</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import {supabase} from '../supabase/init'
import {useRouter} from 'vue-router'
import store from '../store/index'
import {computed} from 'vue' 
export default {
  setup() {

    const router=useRouter();
    const user=computed(()=>store.state.user)

    const logout=async ()=>{
      await supabase.auth.signOut();
      router.push({name:'Login'})
    }
   

    return {logout,user};
  },
};
</script>
