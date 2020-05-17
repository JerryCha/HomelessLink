const state = {
	pageList: [],
	navPageList: [],
	pageData: null
}

const mutations = {
	setPageList (state, pageList) {
		state.pageList = pageList
	},
	setNavPageList (state, pageList) {
		state.navPageList = pageList
	},
	addPageData (state, data) {
		state.pageData = data
	}
}

const getters = {
	pageValues: (state) => {
		return state.pageData
	}
}

const actions = {
	setPageList (context, pageList) {
		context.commit('setPageList', pageList)
	},
	setNavPageList (context, navPageList) {
		context.commit('setNavPageList', navPageList)
	},
	addPageData (context, pageData) {
		context.commit('addPageData', pageData)
	}
}

export default {
	state,
	mutations,
	getters,
	actions,
	namespaced: true
}
