import Vue from 'vue';
import Vuex from 'vuex';
import opentdb from './modules/opentdb';
import localstorage from './modules/localstorage';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		opentdb,
		localstorage,
	},
});
