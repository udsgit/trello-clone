<template>
  <Draggable v-model="cards" group="cards" item-key="id">
    <template #item="{element}">
      <BoardCard :card="element" />
    </template>
  </Draggable>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import Draggable from "vuedraggable";
import BoardCard from "./BoardCard.vue";
export default {
  name: "CardList",
  components: {
    BoardCard,
    Draggable
  },
  props: {
    column: {
      type: Object
    }
  },
  setup(props){
    const store = useStore();
    const cards = computed({
      get: () => store.getters["board/getCardsByColumn"](props.column.id),
      set: value => store.dispatch("board/updateCards", { column: props.column, cards: value})
    })
    return {
      cards
    }
  }
}
</script>

<style scoped>

</style>