const state = {
	pageList: [],
	navPageList: [],
	pageData: null,
	currentTab: 0
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
	},
	setCurrentTab (state, data) {
		state.currentTab = data
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
	},
	setCurrentTab (context, data) {
		context.commit('setCurrentTab', data)
	}
}

export default {
	state,
	mutations,
	getters,
	actions,
	namespaced: true
}
