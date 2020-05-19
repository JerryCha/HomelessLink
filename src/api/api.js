const HOST = 'https://mateshelp.tech'

const LOCATION = {
	'GET_LOCATION': (id) => HOST + '/api/locations/' + id,
	'SEARCH_LOCATIONS': () => HOST + '/api/locations'
}

const PAGE = {
	'PAGE_API': () => HOST + '/api/pages/'
}

const TYPES = {
	'TYPE_API': () => HOST + '/api/types/'
}

export default {
	LOCATION,
	PAGE,
	TYPES
}
