import business from './modules/business'
import application from './modules/application'
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        business,
        application
    }
});