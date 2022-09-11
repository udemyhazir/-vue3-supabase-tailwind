<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>
    <div v-if="dataLoaded">
      <div
        class="
          flex flex-col
          items-center
          p-8
          rounded-md
          shadow-md
          bg-light-grey
          relative
        "
      >
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-orange
              shadow-lg
            "
            @click="editMode"
          >
            <img class="h-3.5 w-auto" src="../assets/images/pencil-light.png" />
          </div>
          <div
            class="
              h-7
              w-7
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              bg-at-light-orange
              shadow-lg
            "
            @click="workoutSil"
          >
            <img class="h-3.5 w-auto" src="../assets/images/trash-light.png" />
          </div>
        </div>

        <img
          v-if="data.workoutType === 'kardiyo'"
          class="h-24 w-auto"
          src="../assets/images/running-light-green.png"
        />

        <img
          v-else
          class="h-24 w-auto"
          src="../assets/images/dumbbell-light-green.png"
        />

        <span
          class="
            mt-6
            py-1.5
            px-5
            text-xs text-white
            bg-at-orange
            rounded-lg
            shadow-md
          "
        >
          {{ data.workoutType }}
        </span>

        <div class="w-full mt-6">
          <input
            v-if="edit"
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-model="data.workoutName"
          />
          <h1 v-else>{{ data.workoutName }}</h1>
        </div>
      </div>

      <div
        class="
          mt-10
          p-8
          rounded-md
          flex flex-col
          items-center
          bg-light-grey
          shadow-md
        "
      >
        <div
          v-if="data.workoutType === 'kas'"
          class="flex flex-col gap-y-4 w-full"
        >
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
              >
                Egzersiz
              </label>
              <input
                id="exercise-name"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.exercise"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Set Sayısı
              </label>
              <input
                id="sets"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.sets"
              />
              <p v-else>{{ item.sets }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Tekrar Sayısı
              </label>
              <input
                id="reps"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.reps"
              />
              <p v-else>{{ item.reps }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Ağırlık
              </label>
              <input
                id="reps"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.weight"
              />
              <p v-else>{{ item.weight }}</p>
            </div>
            <img
              @click="egzersizSil(item.id)"
              v-if="edit"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="../assets/images/trash-light-green.png"
            />
          </div>

          <button
          @click="egzersizEkle"
            v-if="edit"
            type="button"
            class="
              mt-6
              py-2
              px-6
              rounded-sm
              self-start
              text-sm text-white
              bg-at-light-green
              duration-200
              border-solid border-2 border-transparent
              hover:border-white hover:bg-white hover:text-at-light-green
            "
          >
            Egzersiz Ekle
          </button>
        </div>

        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-light-green"
                >Tip</label
              >
              <select
                id="cardioType"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.cardioType"
              >
                <option value="#">Tip Seçiniz</option>
                <option value="koşu">Koşu</option>
                <option value="yürüyüş">Yürüyüş</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Mesafe
              </label>
              <input
                id="distance"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.distance"
              />
              <p v-else>{{ item.distance }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Süre
              </label>
              <input
                id="duration"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.duration"
              />
              <p v-else>{{ item.duration }}</p>
            </div>

            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Adım Sayısı
              </label>
              <input
                id="pace"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.pace"
              />
              <p v-else>{{ item.pace }}</p>
            </div>

            <img
              @click="egzersizSil(item.id)"
              v-if="edit"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="../assets/images/trash-light-green.png"
            />
          </div>

          <button
            @click="egzersizEkle"
            v-if="edit"
            type="button"
            class="
              mt-6
              py-2
              px-6
              rounded-sm
              self-start
              text-sm text-white
              bg-at-light-green
              duration-200
              border-solid border-2 border-transparent
              hover:border-white hover:bg-white hover:text-at-light-green
            "
          >
            Egzersiz Ekle
          </button>
        </div>
      </div>

      <button v-if="edit" type="button"  class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-orange duration-200 border-solid border-2 border-transparent hover:border-white hover:bg-gray-300 hover:text-at-light-orange" @click="workoutGuncelle">Workout Düzenle</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute,useRouter } from "vue-router";
import store from "../store/index";
import {uid} from 'uid'
export default {
  name: "view-workout",
  setup() {
    const data = ref(null);
    const dataLoaded = ref(null);

    const errorMsg = ref(null);
    const statusMsg = ref(null);

    const route = useRoute();

    const id = route.params.id;

    const user = computed(() => store.state.user);

    const router=useRouter();

    const edit = ref(null);
    const editMode = () => {
      edit.value = !edit.value;
    };

    const veriGetir = async (id) => {
      try {
        const { data: workouts, error } = await supabase
          .from("workouts")
          .select("*")
          .eq("id", id);

        if (error) throw error;
        data.value = workouts[0];
        dataLoaded.value = true;

        console.log(data.value);
      } catch (error) {
        errorMsg.value = error.message;

        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    veriGetir(id);

    const egzersizEkle=()=>{
      if(data.value.workoutType==='kas'){
        data.value.exercises.push({
          id:uid(),
          exercise:"",
          sets:"",
          reps:"",
          weight:""
        })
        return;
      }

      data.value.exercises.push({
        id:uid(),
        cardioType:"",
        distancce:"",
        duration:"",
        pace:""
      })
    }

    const workoutSil=async ()=>{

      try {
        const {error}=await supabase.from('workouts').delete().eq("id",id);

        if(error) throw error;

        router.push({name:'Home'})
      } catch (error) {

        errorMsg.value=`HATA: ${error.message}`

        setTimeout(() => {
          errorMsg.value=false
        }, 5000);
        
      }

    }


    const egzersizSil=(id)=>{

      if(data.value.exercises.length>1){
        data.value.exercises=data.value.exercises.filter(exercise=>exercise.id!==id);
        return
      }

      errorMsg.value=`HATA: Silmek için önce eklemelisiniz`

      setTimeout(()=>{
         errorMsg.value=false
      },5000)
    }


    const workoutGuncelle=async ()=>{

      try {
        const {error}=await supabase.from('workouts').update({
          workoutName:data.value.workoutName,
          exercises:data.value.exercises
        }).eq("id",id)

        if(error) throw error;

        edit.value=false;
        statusMsg.value=`BAŞARILI: Workout güncelleme başarılı`

        setTimeout(() => {
          statusMsg.value=false
        }, 5000);
      } catch (error) {
        errorMsg.value=`HATA: ${error.message}`

      setTimeout(()=>{
         errorMsg.value=false
      },5000)
      }
    }

    return { statusMsg, data, dataLoaded, errorMsg, edit, editMode, user,egzersizEkle,workoutSil,egzersizSil,workoutGuncelle };
  },
};
</script>
