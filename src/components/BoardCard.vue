<template>
  <div class="px-3 pt-3 pb-5 mb-3 | bg-white shadow rounded border border-white cursor-move">
    <h4 class="text-gray-700 font-semibold font-sans tracking-wide text-md">
      {{ card.name }}
    </h4>
    <div class="flex mt-4 justify-between items-center">
      <p class="text-sm text-gray-600">{{ cardDate }}</p>
      <UserAvatar/>
    </div>
  </div>
</template>

<script>

import UserAvatar from "./UserAvatar.vue";
import {computed} from "vue";

export default {
  name: "BoardCard",
  components:{
    UserAvatar
  },
  props: {
    card: {
      type: Object
    }
  },
  setup(props){
    const cardDate = computed(() => new Date(Number(props.card.date)).toLocaleDateString("es-ES"))
    return {
      cardDate
    }
  }
}
</script>