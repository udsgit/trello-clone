<template>
  <div v-if="!user">
    <div class="container">
      <a @click="userLogin" class="w-full h-screen | flex justify-center items-center | underline"
         href="#">Login please</a>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";

export default {
  name: "AuthView",
  setup(){
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.state.user.user)
    const userLogin = async () => {
      try{
        await store.dispatch("user/userLogin");
        await router.push("/board");
      }catch(error){
        console.error(error);
      }
    }
    return {
      userLogin,
      user
    }
  }
}
</script>