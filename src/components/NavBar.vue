<template>
  <div class="flex justify-center items-start | relative ">
    <div class="flex items-center">
      <div>
        <h1
            class="text-gray-700 font-semibold font-sans tracking-wide text-3xl text-center"
        >
          {{ boardName }}
        </h1>
        <a href="#" @click="createColumn" class="ml-2 text-sm block text-center mt-3"
        >Create column</a
        >
      </div>
    </div>
    <div class="flex items-center absolute right-0 top-0 ">
      <a href="#" class="mr-2 text-sm">Change background</a>
      <input
          type="search"
          class="bg-gray-300 rounded p-1 text-gray-600 text-sm mr-3"
          placeholder="Search cards"
      />
      <UserAvatar />
      <a href="#" @click="userLogout" class="ml-2 text-sm">Logout</a>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import { useRouter } from "vue-router";
import UserAvatar from "./UserAvatar.vue";
export default {
  name: "NavBar",
  components: {
    UserAvatar
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const boardName = computed(() => store.getters["board/getBoardName"]);
    const createColumn = async () => {
      try{
        await store.dispatch("board/createColumn");
      }catch(error){
        console.error(error.message);
      }
    }
    const userLogout = async () => {
      try{
        await store.dispatch("user/userLogout");
        await router.push("/")
      }catch(error){
        console.error(error);
      }
    }
    return {
      boardName,
      userLogout,
      createColumn
    }
  }
}
</script>