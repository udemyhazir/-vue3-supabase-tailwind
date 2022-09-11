<template>
  <div v-if="appReady" class="font-Roboto min-h-full box-border">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import {ref} from 'vue'
import {supabase} from './supabase/init'
import store from './store/index'
export default {
  components:{
    Navigation
  },
  setup() {

    const appReady=ref(null)

    const user=supabase.auth.user()

    if(!user){
      appReady.value=true
    }

    supabase.auth.onAuthStateChange((_,session)=>{
      console.log(session);
      store.methods.setUser(session);
      appReady.value=true
    })
   

    return {appReady};
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
</style>
