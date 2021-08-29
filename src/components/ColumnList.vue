<template>
   <Draggable v-model="columns" class="board" item-key="key" group="columns">
    <template #item="{element}">
      <AppColumn :column="element">
        <CardList :column="element" />
      </AppColumn>
    </template>
  </Draggable>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import Draggable from "vuedraggable";
import AppColumn from "./AppColumn.vue";
import CardList from "./CardList.vue";
export default {
  name: "ColumnList",
  components: {CardList, AppColumn, Draggable },
  setup(){
    const store = useStore();
    const columns = computed({
      get: () => store.getters["user/getColumns"],
      set: value => store.dispatch("board/updateColumns", value)
    });
    return {
      columns
    }
  }
}
</script>

<style scoped>
.board{
  min-height: 50vh;
  @apply py-10 flex overflow-x-scroll;
}
</style>