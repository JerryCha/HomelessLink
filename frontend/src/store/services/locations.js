import axios from 'axios'
import API from '@/api/api'
import queryHelper from '@/util/query'

const state = {
	resultsList: [],	// results list for showing
	resultsCount: 0,	// count of showing results list
	fetchedLocations: [],	// list to store all the locations within a range
	location: null,	// location for detailed view
	centerLocation: null,	// map center coordinate
	currentLocation: null,	// user location coordinate
	boxBound: {},	// southern-west, northern-east
	queryParams: {}	// parameters for query
}

const getters = {
	// Get filtered locations list. (Not used)
	getLocations (state, type) {
		switch (type) {
		// Return all results
		case '0':
			return state.resultsList.map(loc => {
				return {
					name: loc.name,
					suburb: loc.suburb,
					type: loc.type[loc.type.length - 2],
					// sample: 'SRID=4824; POINT(lng lat)'
					coord: loc.location.substring(loc.location.indexOf('('), loc.location.indexOf(')')).split(' ').map(p => Number(p)),
					website: loc.website
				}
			})
		// Return relief center list
		case '1':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '1')
		// Return organization list
		case '2':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '2')
		// Return homelessness list
		case '3':
			return state.resultsList.filter(loc => loc.type[loc.type.length - 2] === '3')
		}
	}
}

const mutations = {
	/**
	 * resultsList mutator
	 * @param {*} state state reference
	 * @param {Array} locations data source of new results list
	 */
	setResultsList (state, locations) {
		state.resultsList = locations
	},
	/**
	 * resultsCount mutator.
	 * Count will be set to -1 if searching. Otherwise set to the length of resultsList
	 * @param {*} state state reference
	 * @param {*} searchFlag searching status indicator. true if fetching result from backend
	 */
	setResultsCount (state, searchFlag) {
		if (searchFlag) {
			state.resultsCount = -1
		} else {
			state.resultsCount = state.resultsList !== null ? state.resultsList.length : 0
		}
	},
	/**
	 * fetchedLocations mutator.
	 * This is the source of resultsList.
	 * @param {*} state state reference
	 * @param {Array} locations fetched data to set
	 */
	setFetchedLocations (state, locations) {
		state.fetchedLocations = locations
	},
	/**
	 * location mutator.
	 * @param {*} state state reference
	 * @param {Object} location current viewed location.
	 */
	setLocation (state, location) {
		state.location = location
	},
	/**
	 * queryParams mutator.
	 * @param {*} state state reference
	 * @param {Object} form form to set as query parameters
	 */
	setQueryParams (state, form) {
		state.queryParams = form
	},
	/**
	 * centerLocation mutator
	 * @param {*} state state reference
	 * @param {Array} coord new center coordinate on map. (format: [lng, lat])
	 */
	setCenterLocation (state, coord) {
		state.centerLocation = coord
	},
	/**
	 * currentLocation mutator
	 * @param {*} state state reference
	 * @param {*} coord new user location coordinate. (format: [lng, lat])
	 */
	setCurrentLocation (state, coord) {
		state.currentLocation = coord
	},
	setBoxBound (state, bound) {
		state.boxBound = bound
	}
}

const actions = {
	/**
	 * Fetching locations as per query conditions.
	 * @param {*} context context
	 */
	searchLocations (context) {
		return axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?' + queryHelper.locationQueryBuilder(context.state.queryParams))
			.then(res => {
				// Once data fetched successfully, setting to both fetchedLocations & resultsList.
				context.commit('setFetchedLocations', res.data)
				context.commit('setResultsList', res.data)
				context.commit('setResultsCount')
			})
			.catch(e => { window.console.error(e) })
	},
	/**
	 * Filtering display results by updating resultsList.
	 * @param {*} context context
	 * @param {*} type type of location
	 */
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
	/**
	 * Getting detailed information for a particular location, using its id.
	 * @param {*} context context
	 * @param {*} id Id of location. Used for fetching detailed information from backend.
	 */
	getLocation (context, id) {
		return axios.get(API.LOCATION.GET_LOCATION(id))
			.then(res => {
				context.commit('setLocation', res.data)
			})
			.catch(e => { window.console.error(e) })
	},
	/**
	 * Set location to null. Used for back to result list from detailed view.
	 * @param {*} context context
	 */
	flushLocation (context) {
		context.commit('setLocation', null)
	},
	/**
	 * Setting center location, invoked by components.
	 * @param {*} context context
	 * @param {*} geoLocationCoords new center coordinate
	 */
	setCenterLocation (context, geoLocationCoords) {
		// Argument coord is in format of [lng, lat]
		context.commit('setCenterLocation', geoLocationCoords)
	},
	/**
	 * Setting user's current location, invoked by components.
	 * @param {*} context context
	 * @param {*} geoLocationCoords new user location
	 */
	setCurrentLocation (context, geoLocationCoords) {
		// Argument coord is in format of [lng, lat]
		context.commit('setCurrentLocation', geoLocationCoords)
		context.commit('setCenterLocation', geoLocationCoords)
	},
	/**
	 * Update map view boundary after changed.
	 * @param {*} context context
	 * @param {Object} newBoxBound new mapview bound coordinates. (format: {ne: [lng, lat], sw: [lng, lat]})
	 */
	updateBoxBound (context, newBoxBound) {
		context.commit('setBoxBound', newBoxBound)
	},
	/**
	 * Update query parameters
	 * @param {*} context context
	 * @param {*} form form of query conditions
	 */
	setQueryParams (context, form) {
		context.commit('setQueryParams', form)
	},
	/**
	 * Set resultsCount to searching value (-1)
	 * @param {*} context context
	 */
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
