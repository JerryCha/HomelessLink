export default {
	/**
	 * Build query parameters for GET method.
	 * @param {*} params parameters object
	 */
	locationQueryBuilder (params) {
		return `ne=${params.bound.ne}&sw=${params.bound.sw}`
	}
}
