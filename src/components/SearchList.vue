<template>
  <div>
		<!-- Filter -->
		<div id="filter-panel" style="display: flex; align-items: center; justify-content: space-between;">
			<!-- Type filter button -->
			<b-button variant="light" @click="$bvToast.show('filter-panel')">Filter</b-button>
			<!-- Results count -->
			<div>
          Found {{this.$store.state.locations.resultsCount}} results
      </div>
			<!-- Filter panel-->
			<b-toast id="filter-panel" title="Type Select" static no-auto-hide solid>
				<TypeFilter :options="filterOptionsList"/>
			</b-toast>
			<!-- Result count -->
			<!-- <p :class="isSearching()||hasNoResult()?'invisible':''">{{ resultsCount }} results found for <strong>{{ targetLocation }}</strong>.</p> -->
		</div>
		<div id="content-block">
			<!-- Searching indication block -->
			<div :class="isSearching()?'':'invisible'">
				<p id="searching-text">Searching</p>
			</div>
			<!-- No result block -->
			<div :class="hasNoResult()?'':'invisible'">
				<p id="searching-text">No Result</p>
			</div>
			<!-- Result block -->
			<div :class="isSearching()||hasNoResult()?'invisible':''" id="result-list">
				<PoiCard class="result-card" v-for="poi in results"
									:key="poi.id"
									:id="poi.id"
									:name="poi.name"
									:suburb="poi.suburb"
									:website="poi.website"
				/>
			</div>
		</div>
		<!-- back to previous page button -->
    <!-- <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button> -->
  </div>
</template>

<script>
import PoiCard from '@/components/PoiCard.vue'
import axios from 'axios'
import TypeFilter from '@/components/TypeSelectPanel.vue'

export default {
	name: 'search-list',
	components: {
		PoiCard,
		TypeFilter
	},
	data () {
		return {
			// filterOptions is dynamically loaded from backend
			filterOptionsList: [

			]
		}
	},
	methods: {
		goBack: function () {
			this.$store.dispatch('locations/flushResultsList')
			this.$router.go(-1)
		},
		isSearching: function () {
			return this.$store.state.locations.resultsCount === -1
		},
		hasNoResult: function () {
			return this.$store.state.locations.resultsCount === 0
		}
	},
	mounted () {
		// Get location type from backend
		axios.get('/api/types/').then((response) => {
			var tempArray = []
			var valueArray = []
			for (var key in response.data) {
				var option = response.data[key]
				var filter = {
					value: option.id, text: option.name
				}
				tempArray.push(filter)
				valueArray.push(filter.value)
			}
			this.$store.dispatch('locations/setFilterTypes', valueArray)
			this.filterOptionsList = tempArray
		})
	},
	watch: {
	},
	computed: {
		results: function () {
			return this.$store.state.locations.resultsList
		},
		resultsCount: function () {
			return this.$store.state.locations.resultsCount
		}
		// targetLocation: function () {
		// 	return this.$store.state.locations.queryParams === null
		// 		? '' : this.$store.state.locations.queryParams.queryForm.location
		// }
	}
}
</script>

<style scoped>
#back-button {
  position: relative;
  bottom: 0px;
  margin: 0.5em auto;
}
#content-block {
  height: calc(100% - 38px);
  overflow-y: scroll;
	margin-top: 0.5rem;
}
#result-list {
	max-height: 100%;
}
.result-card {
  margin: 0.5em 0.2em;
	/* x offset | y offset | blur radius | spread radius | color */
	box-shadow: 0px 0px 0px 0px rgba(255,255,255,0);
	transition: box-shadow .3s;
}
.result-card:hover {
	z-index: 0;
	box-shadow: 4px 4px 8px 0px rgba(128,128,128,.5);
}
.invisible {
	display: none;
}
#searching-text {
	font-size: 2em;
}
.b-toast {
	position: absolute;
}
</style>
