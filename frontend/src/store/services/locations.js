const state = {
	locations: []
}

const getters = {
	getReliefCenter (state) {
		// TODO: Confirm type
		return state.locations.filter(loc => loc.type === 'relief')
	}
}

const mutations = {
	setLocations (state, locations) {
		state.locations = locations
	},
	setLocation (state, location) {
		state.location = location
	}
}

const actions = {
	getLocationsList (context) {
		return null
	},
	getLocation (context, id) {
		return null
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
