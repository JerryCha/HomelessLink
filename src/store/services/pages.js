const state = {
	pageList: [],	// List of topic page
	navPageList: [],	// List of topic page for navigation use
	pageData: null,	// Current enter page data
	currentTab: 0	// Current tab being viewed in topic page
}

const mutations = {
	/**
	 * Set pageList
	 * @param {*} state state
	 * @param {*} pageList pageList
	 */
	setPageList (state, pageList) {
		state.pageList = pageList
	},
	/**
	 * Set navPageList
	 * @param {*} state state
	 * @param {*} pageList pageList
	 */
	setNavPageList (state, pageList) {
		state.navPageList = pageList
	},
	/**
	 * Set pageData
	 * @param {*} state state
	 * @param {*} data data
	 */
	addPageData (state, data) {
		state.pageData = data
	},
	/**
	 * Set currentTab index.
	 * @param {*} state state
	 * @param {*} data data
	 */
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
	/**
	 * Set page list
	 * @param {*} context context
	 * @param {*} pageList page list
	 */
	setPageList (context, pageList) {
		context.commit('setPageList', pageList)
	},
	/**
	 * Set nav page list
	 * @param {*} context context
	 * @param {*} navPageList navPageList
	 */
	setNavPageList (context, navPageList) {
		context.commit('setNavPageList', navPageList)
	},
	/**
	 * Set page data being viewed
	 * @param {*} context context
	 * @param {*} pageData pageData
	 */
	addPageData (context, pageData) {
		context.commit('addPageData', pageData)
	},
	/**
	 * Set tab index of current view in topic home
	 * @param {*} context context
	 * @param {*} data data
	 */
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
