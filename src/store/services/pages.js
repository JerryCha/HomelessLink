const state = {
	pageList: [],
	navPageList: []
}

const mutations = {
	setPageList (state, pageList) {
		state.pageList = pageList
	},
	setNavPageList (state, pageList) {
		state.navPageList = pageList
	}
}

const getters = {
}

const actions = {
	setPageList (context, pageList) {
		context.commit('setPageList', pageList)
	},
	setNavPageList (context, navPageList) {
		context.commit('setNavPageList', navPageList)
	}
}

export default {
	state,
	mutations,
	getters,
	actions,
	namespaced: true
}
