const HOST = 'https://mateshelp.herokuapp.com'

const LOCATION = {
	'GET_LOCATION': (id) => HOST + '/api/locations/' + id,
	'SEARCH_LOCATIONS': () => HOST + '/api/locations'
}

export default {
	LOCATION
}
