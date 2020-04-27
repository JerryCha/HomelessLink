<template>
  <div>
		<!-- Filter -->
		<div>
			<!-- Type filter button -->
			<b-button variant="light" @click="$bvToast.show('filter-panel')">Filter</b-button>
			<!-- Filter panel overlay-->
			<b-toast id="filter-panel" title="Type Select" static no-auto-hide solid>
				<TypeFilter :options="filterOptionsList"/>
			</b-toast>
		</div>
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
			<p>{{ resultsCount }} results found.</p>
      <PoiCard class="result-card" v-for="(poi, idx) in results"
                :key="idx"
								:id="poi.id"
                :name="poi.name"
                :suburb="poi.suburb"
								:website="poi.website"
      />
    </div>
		<!-- back to previous page button -->
    <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button>
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
		// Query once components mounted
		this.$store.dispatch('locations/searchLocations')
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
	}
}
</script>

<style scoped>
#back-button {
  position: relative;
  bottom: 0px;
  margin: 0.5em auto;
}
#result-list {
  max-height: 75vh;
  overflow-y: auto;
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
