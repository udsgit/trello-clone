import { createStore } from "vuex";
import board from "./modules/board.js";
import user from "./modules/user.js";

export default createStore({
    actions: {
      initApp({dispatch}) {
          dispatch("board/getBoard");
          dispatch("board/getColumns");
      }
    },
    modules: { board, user}
});
