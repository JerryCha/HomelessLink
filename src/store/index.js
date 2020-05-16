import Vue from 'vue'
import Vuex from 'vuex'
import locations from '@/store/services/locations'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		locations
	},
	state:{
		pageData: null
	},
	mutations:{
		addPageData(state, data){
			state.pageData = data;
		}
	},
	getters:{
		pageValues: (state) => {
			return state.pageData
		}
	}
})

export default store
