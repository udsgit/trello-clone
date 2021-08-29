<template>
  <NavBar/>
  <ColumnList/>
  <RouterView></RouterView>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ColumnList from "../components/ColumnList.vue";
import {useStore} from "vuex";

export default {
  name: "BoardView",
  components: {
    NavBar,
    ColumnList
  },
  setup(){
    const store = useStore();
    store.dispatch("initApp");
  }
}
</script>