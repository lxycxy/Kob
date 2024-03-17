import { createStore } from 'vuex'
import ModuleUser from './user'
import ModulePk from './pk'
import ModuleRecord from './record'
import createPersistedState from "vuex-persistedstate";
export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user: ModuleUser,
        pk:ModulePk,
        record:ModuleRecord,
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            key: 'store',
            paths: ['user']
        })
    ]
})
