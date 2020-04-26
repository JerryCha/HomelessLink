import axios from 'axios'
import API from '@/api/api'

const state = {
	resultsList: null,
	resultsCount: 0,
	location: null,
	centerLocation: null,
	currentLocation: null,
	viewBound: [],	// southern-west, northern-east
	queryForm: {}
}

const getters = {
	getReliefCenter (state) {
		// TODO: Confirm type
		return state.resultsList.filter(loc => loc.type === '1')
	},
	getLocations (state) {
		return state.resultsList.map(loc => {
			return {
				name: loc.name,
				suburb: loc.suburb,
				type: loc.type[loc.type.length - 2],
				coord: loc.location.substring(loc.location.indexOf('('), loc.location.indexOf(')')),
				website: loc.website
			}
		})
	}
}

const mutations = {
	setResultsList (state, locations) {
		state.resultsList = locations
	},
	setResultsCount (state) {
		state.resultsCount = state.resultsList !== null ? state.resultsList.length : 0
	},
	setLocation (state, location) {
		state.location = location
	},
	setQueryForm (state, form) {
		state.queryForm = form
	},
	setCenterLocation (state, coord) {
		state.centerLocation = coord
	},
	setCurrentLocation (state, coord) {
		state.currentLocation = coord
	},
	setViewBound (state, bound) {
		state.viewBound = bound
	}
}

const actions = {
	searchLocations (context) {
		window.console.log(JSON.stringify(context.state.queryForm))
		return axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?bound=' + context.state.queryForm)
			.then(res => {
				console.log(res)
				context.commit('setResultsList', res.data)
				context.commit('setResultsCount')
			})
			.catch(e => { window.console.error(e) })
	},
	flushResultsList (context) {
		context.commit('setResultsList', null)
		context.commit('setResultsCount')
	},
	getLocation (context, id) {
		return axios.get(API.LOCATION.GET_LOCATION(id))
			.then(res => {
				console.log(res)
				context.commit('setLocation', res.data)
			})
			.catch(e => { window.console.error(e) })
	},
	flushLocation (context) {
		context.commit('setLocation', null)
	},
	setCenterLocation (context, geoLocationCoords) {
		// Argument coord is in format of [lng, lat]
		context.commit('setCenterLocation', geoLocationCoords)
	},
	setCurrentLocation (context, geoLocationCoords) {
		// Argument coord is in format of [lng, lat]
		context.commit('setCurrentLocation', geoLocationCoords)
		context.commit('setCenterLocation', geoLocationCoords)
	},
	updateViewBound (context, newViewBound) {
		context.commit('setViewBound', newViewBound)
	},
	setQueryForm (context, form) {
		context.commit('setQueryForm', form)
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
