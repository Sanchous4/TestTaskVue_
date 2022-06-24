import api from '../../api/products.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// Глобальное хранилище определено просто так
export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        // В метод не передаются данные, аргументы здесь не требуются
        // Не помешал бы try catch для запроса
        // Лучше данные отдавать через getters
        getProductsList(ctx, data) {
            return api.getProductsList();
        },
    },
    modules: {},
});
