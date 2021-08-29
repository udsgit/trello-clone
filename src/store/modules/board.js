//import { board, columns, cards } from "../../seed.js";
import { db } from "../../firebase.js";
export default {
    namespaced: true,
    state: {
        board: {},
        columns: [],
        cards: [],
    },
    getters: {
        getBoardName: state => state.board.name,
        getColumns: state => state.columns.sort((a,b) => a.order - b.order),
        getCardsByColumn: state => column => state.cards.filter(card => card.column === column).sort((a, b) => a.order - b.order),
        getNextColumnOrder: state => Math.max(...state.columns.map(column => column.order)) + 1
    },
    mutations: {
        SET_BOARD: (state, board) => state.board = board,
        SET_COLUMNS: (state, columns) => state.columns = columns
    },
    actions: {
        getColumns: async({commit, rootState}) => {
          const doSnapshot = querySnapshot => {
             const columns = [];
             querySnapshot.forEach(doc => {
                 columns.push(doc.data());
             })
              commit("SET_COLUMNS", columns);
          }
          await db
                .collection("columns")
                .where("board", "==", rootState.user.user.uid)
                .onSnapshot(doSnapshot);
        },
        getBoard: async ({rootState, commit}) => {
            const uid = rootState.user.user.uid;
            const defaultBoard = {
                name: "Your first board 🔥",
                id: uid,
                backgroundColor: "#FFFFFF"
            }
            let board = await db.collection("boards").doc(uid).get();

            if (!board.exists){
                await db.collection("boards").doc(uid).set(defaultBoard);
                board = defaultBoard;
            } else {
                board = board.data();
            }
            commit("SET_BOARD", board);
        },
        createColumn: async ( { rootState, state, getters } ) => {
            const ref = db.collection("columns");
            const { id } = ref.doc();
            const column = {
                name: "New Column",
                id,
                board: rootState.user.user.uid,
                order: state.columns.length ? getters["getNextColumnOrder"] : 0
            }
            await ref.doc(id).set(column);
        },
        updateColumns: (context, columns) => {
            console.log(columns);
        },
        updateCards: (context, {column, cards}) => {
            console.log(column, cards)
        }
    }
}
