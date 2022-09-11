<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <div v-if="data.length===0" class="w-full flex flex-col items-center">
      <h1>Henüz workout eklenmedi</h1>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer" :to="{name:'View',params:{id:workout.id}}" v-for="(workout,index) in data" :key="index">
        <img v-if="workout.workoutType==='kardiyo'" src="../assets/images/running-light-green.png" class="h-24 w-auto" />
        <img v-else src="../assets/images/dumbbell-light-green.png" class="h-24 w-auto" />
        <p class="mt-6 py-1 px-3 text-sm text-white bg-at-orange shadow-md rounded-lg">{{workout.workoutType}}</p>
        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-orange">{{workout.workoutName}}</h1>

      </router-link>
    </div>
  </div>
</template>

<script>
import {supabase} from '../supabase/init'
import {ref} from 'vue'
export default {
  name: "Home",
  components: {},
  setup() {

    const data=ref([])
    const dataLoaded=ref(null)

    const verileriGetir=async ()=>{
      try {
        
        const {data:workouts,error}=await supabase.from('workouts').select('*')

        if(error) throw error;

        data.value=workouts;
        dataLoaded.value=true;
        console.log(data.value);

      } catch (error) {

        console.warn(error.message)
        
      }
    }

    verileriGetir()
    

    return {data,dataLoaded};
  },
};
</script>
