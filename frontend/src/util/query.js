export default {
	locationQueryBuilder (params) {
		return `ne=${params.bound.ne}&sw=${params.bound.sw}`
	}
}
