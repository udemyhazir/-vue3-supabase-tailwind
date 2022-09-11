<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- mesaj -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md">
      <p class="text-at-light-green">{{statusMsg}}</p>
      <p class="text-red-500">{{errorMsg}}</p>
    </div>

    <!--Workout-->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <form @submit.prevent="workoutOlustur" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-light-orange">Workout Oluştur</h1>

        <!--Workout İsmi-->

        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-green">Workout İsmi:</label>
          <input type="text" required class="p-2 text-gray-500 focus:outline-none" id="workout-name" v-model="workoutName" />
        </div>

        <!--Workout Type-->

        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-green">Workout Tipi:</label>
          <select id="workout-type" class="p-2 text-gray-500 focus:outline-none" required v-model="workoutType" @change="workoutDegisiklik">
            <option value="seciniz" disabled>Workout Seçiniz</option>
            <option value="kas">Kas Geliştirme</option>
            <option value="kardiyo">Kardiyo</option>
          </select>
        </div>

        <!--kas için egzersiz-->

        <div v-if="workoutType=='kas'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item,index) in exercises" :key="index">
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green ">Egzersiz: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.exercise"  />
            </div>

            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green ">Set Adet: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.sets"  />
            </div>

            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green ">Tekrar Adet: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.reps"  />
            </div>

            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green ">Ağırlık: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.weight"  />
            </div>

            <img @click="egzersizSil(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" />
          </div>

          <button @click="egzersizEkle" type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-white hover:text-at-light-green hover:bg-white">Egzersiz Ekle</button>
        </div>


        <!--kardiyo için egzersiz-->

        <div v-if="workoutType=='kardiyo'" class="flex flex-col gap-y-4">
          <div class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item,index) in exercises" :key="index">
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green ">Kardiyo Tip: </label>
              <select id="cardio-type" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.cardioType">
                <option value="#" disabled>Tip Seçiniz</option>
                <option value="koşu">Koşu</option>
                <option value="yürüyüş">Yürüyüş</option>
              </select>
            </div>

            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-light-green ">Mesafe: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.distance"  />
            </div>

            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-light-green ">Süre: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.duration"  />
            </div>

            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-light-green ">Adım Sayısı: </label>
              <input required type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.pace"  />
            </div>

            <img @click="egzersizSil(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" />
          </div>

          <button @click="egzersizEkle" type="button" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-white hover:text-at-light-green hover:bg-white">Egzersiz Ekle</button>
        </div>

        <button  type="submit" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-orange duration-200 border-solid border-2 border-transparent hover:border-white hover:text-at-light-orange hover:bg-white">Workout Ekle</button>

      </form>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {uid} from 'uid'
import {supabase} from '../supabase/init'
export default {
  name: "create",
  setup() {

    const workoutName=ref('')
    const workoutType=ref('seciniz')
    const exercises=ref([])
    const statusMsg=ref(null)
    const errorMsg=ref(null)

    const egzersizEkle=()=>{
      if(workoutType.value==='kas'){
        exercises.value.push({
          id:uid(),
          exercise:"",
          sets:"",
          reps:"",
          weight:""
        })
        return;
      }

      exercises.value.push({
        id:uid(),
        cardioType:"",
        distance:"",
        duration:"",
        pace:""
      })
   }

   const egzersizSil=(id)=>{
      if(exercises.value.length >1 ){
        exercises.value=exercises.value.filter(exercise=>exercise.id !==id)
        return
      }

      errorMsg.value="HATA: Silmek için önce ekleyiniz"

      setTimeout(() => {
        errorMsg.value=false
      }, 5000);
   }

   const workoutDegisiklik=()=>{

      exercises.value=[];
      egzersizEkle();
   }

   const workoutOlustur=async()=>{

    try {

      const {error}=await supabase.from('workouts').insert({
        workoutName:workoutName.value,
        workoutType:workoutType.value,
        exercises:exercises.value
      })

      if(error) throw error;
      statusMsg.value="BAŞARILI : Workout Eklendi"
      workoutName.value=null
      workoutType.value='seciniz'
      exercises.value=[]

      setTimeout(()=>{
        statusMsg.value=false
      },5000)
      
    } catch (error) {
      errorMsg.value=`HATA: ${error.message}`

      setTimeout(()=>{
        errorMsg.value=false
      },5000)
    }
   }
   

    return {workoutName,workoutType,exercises,statusMsg,errorMsg,egzersizEkle,workoutDegisiklik,egzersizSil,workoutOlustur};
  },
};
</script>
