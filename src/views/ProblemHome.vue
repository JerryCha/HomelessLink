<template>
  <div id="problem-home-container">
		<b-overlay id="loading-overlay" :show="loadingStatus === 1">
			<ProblemHomeTemplate
				v-if="$store.state.pages.pageData !== null"
				:bannerImg="bannerImgSrc[problem]"
			/>
		</b-overlay>
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
				})
				.then(() => {
					this.$store.dispatch('locations/setAllTypes', this.topicCategoryCode)
					this.$store.dispatch('locations/setResultsType', this.topicCategoryCode)
					this.$store.dispatch('locations/setFilterTypes', this.topicCategoryCode)
					this.updateLocationData()
				})
				.then(() => {
					that.loadingStatus = 2
				})
				.catch((err) => {
					that.loadingStatus = 3
					window.console.error(err)
				})
		},
		updateLocationData () {
			this.$store.dispatch('locations/setResultsCountToSearching')
			axios.get(API.LOCATION.SEARCH_LOCATIONS() + '?types=' + this.topicCategoryCode)
				.then(res => {
					this.$store.dispatch('locations/setFetchedLocations', res.data)
				})
		}
	},
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
		},
		bannerImgSrc () {
			return {
				essential: 'seekhelp_essential_bg_horizontal.jpg',
				eldercare: 'seekhelp_feet_bg_horizontal.jpg',
				healthy: 'seekhelp_health_bg_horizontal.jpg',
				addiction: 'seekhelp_addiction_bg_horizontal.jpg',
				community: 'seekhelp_community_bg_horizontal.jpg'
			}
		}
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
#problem-home-container {
	padding: 1rem 0.5rem;
}
</style>
