import axios from 'axios'
import API from '@/api/api'
import queryHelper from '@/util/query'

const state = {
	resultsList: null,
	resultsCount: 0,
	location: null,
	centerLocation: null,
	currentLocation: null,
	viewBound: {},	// southern-west, northern-east
	queryParams: {}
}

const getters = {
	getOrganizations (state) {
		return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '2')
	},
	getLocations (state, type) {
		switch (type) {
		// Return all results
		case '0':
			return state.resultsList.map(loc => {
				return {
					name: loc.name,
					suburb: loc.suburb,
					type: loc.type[loc.type.length - 2],
					coord: loc.location.substring(loc.location.indexOf('('), loc.location.indexOf(')')),
					website: loc.website
				}
			})
		case '1':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '1')
		case '2':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '2')
		case '3':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '3')
		}
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
	setQueryParams (state, form) {
		state.queryParams = form
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
		window.console.log(API.LOCATION.SEARCH_LOCATIONS() + '?' + queryHelper.locationQueryBuilder(context.state.queryParams))
		return axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?' + queryHelper.locationQueryBuilder(context.state.queryParams))
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
	setQueryParams (context, form) {
		context.commit('setQueryParams', form)
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
