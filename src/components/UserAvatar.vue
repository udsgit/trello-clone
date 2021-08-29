<template>
  <img :src="userAvatar" alt="Avatar" class="w-8 h-8 rounded-full" />
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "UserAvatar",
  setup() {
    const store = useStore();
    const userAvatar = computed(() => store.getters['user/getUserAvatar']);
    return {
      userAvatar
    }
  }
}
</script>