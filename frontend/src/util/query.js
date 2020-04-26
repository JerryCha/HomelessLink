export default {
	locationQueryBuilder (params) {
		window.console.log('query builder: ' + JSON.stringify(params))
		return `ne=${params.bound.ne}&sw=${params.bound.sw}`
	}
}
