const HOST = 'http://192.168.1.7:8080'

const LOCATION = {
	'GET_LOCATION': (id) => HOST + '/api/locations/' + id,
	'SEARCH_LOCATIONS': () => HOST + '/api/locations'
}

export default {
	LOCATION
}
