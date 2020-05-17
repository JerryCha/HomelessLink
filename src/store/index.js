import Vue from 'vue'
import Vuex from 'vuex'
import locations from '@/store/services/locations'
import pages from '@/store/services/pages'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		locations,
		pages
	}
})

export default store
