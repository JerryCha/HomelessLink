const HOST = 'https://mateshelp.herokuapp.com'

const LOCATION = {
	'GET_LOCATION': (id) => HOST + '/api/locations/' + id,
	'SEARCH_LOCATIONS': () => HOST + '/api/locations'
}

const PAGE = {
	'GET_PAGE_LIST': () => HOST + '/api/pages',
	'GET_PAGE': (id) => HOST + '/api/pages/' + id
}

export default {
	LOCATION,
	PAGE
}
