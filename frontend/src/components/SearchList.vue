<template>
  <div>
		<!-- list top block -->
		<div>
			<!-- Type select -->
			<b-form-group label="Type" v-if="filterOptionsList.length > 0">
					<b-form-select v-model="filterType" :options="filterOptionsList"></b-form-select>
				</b-form-group>
		</div>
		<!-- Searching indication block -->
		<div :class="isSearching()?'':'invisible'">
			<p id="searching-text">Searching</p>
		</div>
		<!-- No result block -->
		<div :class="hasNoResult()?'':'invisible'">
			<p id="searching-text">Not Found</p>
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

export default {
	name: 'search-list',
	components: {
		PoiCard
	},
	data () {
		return {
			filterType: '0',
			// filterOptions is dynamically loaded from backend
			filterOptions: [

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
		const that = this
		// Get location type from backend
		axios.get('/api/types/').then(function (response) {
			that.filterOptions = response.data
		})
	},
	watch: {
		filterType (newVal, oldVal) {
			this.$store.dispatch('locations/filterResultsList', String(newVal))
		}
	},
	computed: {
		filterOptionsList: function () {
			var temp_array = []
			// If filterOptions is not empty, create a new one
			if (this.filterOptions.length > 0) {
				// Add 'ALL' manually
				var filter = { value: '0', text: 'All' }
				temp_array.push(filter)
				// Adding other options from retrived data.
				for (var key in this.filterOptions) {
					var option = this.filterOptions[key]
					var filter = {
						value: option.id, text: option.name
					}
					temp_array.push(filter)
				}
			}

			return temp_array
		},
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
</style>
