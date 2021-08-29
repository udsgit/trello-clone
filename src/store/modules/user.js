import { firebase, auth } from "/src/firebase.js";
export default {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUserAvatar: state => state.user && state.user.photoURL
    },
    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        getUser: ({commit} ) => {
            return new Promise(resolve => {
                firebase.auth().onAuthStateChanged(user => {
                    commit("SET_USER", user);
                    resolve(user);
                })
            })
        },
        async userLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
        },
        async userLogout(){
            await auth.signOut();
        }
    }
}