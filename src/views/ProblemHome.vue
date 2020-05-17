<template>
  <div>
    <ProblemHomeTemplate v-if="$store.state.pages.pageData !== null"/>
  </div>
</template>

<script>
import ProblemHomeTemplate from '@/components/ProblemHomeTemplate'
import axios from 'axios'
import API from '@/api/api'

export default {
	name: 'problem-home',
	components: {
		ProblemHomeTemplate
	},
	props: {
		'problem': {
			type: String
		}
	},
	data () {
		return {
			// currentID: null,
			loadingStatus: 0	// 0: initialized, 1: loading, 2: loaded, 3: failed
		}
	},
	methods: {
		updateapiData () {
			const that = this
			that.loadingStatus = 1
			axios.get(API.PAGE.PAGE_API() + this.currentId)
				.then(function (response) {
					that.$store.dispatch('pages/addPageData', response.data)
					that.loadingStatus = 2
				})
				.then(() => {
					this.updateLocationData()
				})
				.catch((err) => {
					that.loadingStatus = 3
					window.console.error(err)
				})
			// this.currentID = this.$route.params.problem
		},
		updateLocationData () {
			this.$store.dispatch('locations/setAllTypes', this.topicCategoryCode)
			this.$store.dispatch('locations/setResultsType', this.topicCategoryCode)
			this.$store.dispatch('locations/setFilterTypes', this.topicCategoryCode)
			axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?types=' + this.topicCategoryCode)
				.then(res => {
					window.console.log('fetched locations data')
					this.$store.dispatch('locations/setFetchedLocations', res.data)
				})
		}
	},
	// updated () {
	// 	this.updateapiData()
	// },
	created () {
		this.updateapiData()
	},
	mounted () {
		this.navbar.setToLightMode()
	},
	computed: {
		navbar () {
			return this.$store.state.locations.navbar
		},
		currentId () {
			return this.$route.params.problem
		},
		topicCategoryCode () {
			return this.$store.state.pages.pageData.categories
		}
		// topic () {
		// 	this.updateapiData()
		// 	return null
		// }
	},
	watch: {
		loadingStatus (newVal, oldVal) {
		},
		currentId (newVal, oldVal) {
			this.updateapiData()
		}
	}
}
</script>

<style scoped>
#loading-overlap {
	width: 96vw;
	height: 98vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(244,245,246,1);
}
#problem-subpage {
	padding: 1rem 0.5rem;
	background-color: rgba(244,245,246,1);
}
</style>
