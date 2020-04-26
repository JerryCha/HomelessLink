import axios from 'axios'
import API from '@/api/api'
import queryHelper from '@/util/query'

const state = {
	resultsList: [],
	resultsCount: 0,
	fetchedLocations: [],
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
	setResultsCount (state, searchFlag) {
		if (searchFlag) {
			state.resultsCount = -1
		} else {
			state.resultsCount = state.resultsList !== null ? state.resultsList.length : 0
		}
	},
	setFetchedLocations (state, locations) {
		state.fetchedLocations = locations
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
		return axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?' + queryHelper.locationQueryBuilder(context.state.queryParams))
			.then(res => {
				context.commit('setFetchedLocations', res.data)
				context.commit('setResultsList', res.data)
				context.commit('setResultsCount')
			})
			.catch(e => { window.console.error(e) })
	},
	filterResultsList (context, type) {
		// TODO: Optimize update strategy
		switch (type) {
		case '0':
			context.commit('setResultsList', state.fetchedLocations)
			context.commit('setResultsCount')
			break
		case '1':
			context.commit('setResultsList', state.fetchedLocations.filter(loc => loc.type[loc.type.length - 2] === '1'))
			context.commit('setResultsCount')
			break
		case '2':
			context.commit('setResultsList', state.fetchedLocations.filter(loc => loc.type[loc.type.length - 2] === '2'))
			context.commit('setResultsCount')
			break
		case '3':
			context.commit('setResultsList', state.fetchedLocations.filter(loc => loc.type[loc.type.length - 2] === '3'))
			context.commit('setResultsCount')
			break
		}
	},
	// temporary flush both resultsList and fetchedResults
	flushResultsList (context) {
		context.commit('setResultsList', [])
		context.commit('setResultsCount')
		context.commit('setFetchedLocations', [])
	},
	getLocation (context, id) {
		return axios.get(API.LOCATION.GET_LOCATION(id))
			.then(res => {
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
	},
	setResultsCountToSearching (context) {
		context.commit('setResultsCount', true)
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
	namespaced: true
}
