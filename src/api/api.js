const HOST = 'https://mateshelp.tech'
// const HOST = 'localhost:8000'

const LOCATION = {
	'GET_LOCATION': (id) => HOST + '/api/locations/' + id,
	'SEARCH_LOCATIONS': () => HOST + '/api/locations'
}

const PAGE = {
	'PAGE_API': () => HOST + '/api/pages/'
}

export default {
	LOCATION,
	PAGE
}
