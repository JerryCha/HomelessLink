import axios from 'axios'
import API from '@/api/api'

const state = {
	locations: [],
	location: null,
	currentLocation: null,
	viewBound: []	// southern-west, northern-east
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
	},
	setCurrentLocation (state, coord) {
		state.currentLocation = coord
	},
	setViewBound (state, bound) {
		state.viewBound = bound
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
	},
	setCurrentLocation (context, geoLocationCoords) {
		// Argument coord is in format of [lng, lat]
		// const coord = [geoLocationCoords.longitude, geoLocationCoords.latitude]
		window.console.log('$store.currentLocations: ' + geoLocationCoords)
		context.commit('setCurrentLocation', geoLocationCoords)
	},
	updateViewBound (context, newViewBound) {
		context.commit('setViewBound', newViewBound)
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
