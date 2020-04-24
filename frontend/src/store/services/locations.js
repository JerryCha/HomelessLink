import axios from 'axios'
import API from '@/api/api'

const state = {
	locations: [],
	location: null
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
	},
	setQueryForm (state, form) {
		state.queryForm = form
	}
}

const actions = {
	searchLocations (context, form) {
		window.console.log(JSON.stringify(form))
		return axios.post(API.LOCATION.SEARCH_LOCATIONS(), form)
			.then(res => {
				console.log(res)
				context.commit('setLocation', res.data)
			})
			.catch(e => { window.console.error(e) })
	},
	getLocation (context, id) {
		return axios.get(API.LOCATION.GET_LOCATION(id))
			.then(res => {
				console.log(res)
				context.commit('setLocation', res.data)
			}).catch(e => { window.console.error(e) })
	},
	flushLocation (context) {
		context.commit('setLocation', null)
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
