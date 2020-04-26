<template>
  <div>
		<div>
			<b-form-group label="Type">
					<b-form-select v-model="filterType" :options="filterOptions"></b-form-select>
				</b-form-group>
		</div>
		<div :class="isSearching()?'':'invisible'">
			<p id="searching-text">Searching</p>
		</div>
		<div :class="hasNoResult()?'':'invisible'">
			<p id="searching-text">Not Found</p>
		</div>
    <div id="result-list">
      <PoiCard class="result-card" v-for="(poi, idx) in results"
                :key="idx"
								:id="poi.id"
                :name="poi.name"
                :suburb="poi.suburb"
								:website="poi.website"
      />
    </div>
    <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button>
  </div>
</template>

<script>
import PoiCard from '@/components/PoiCard.vue'

export default {
	name: 'search-list',
	components: {
		PoiCard
	},
	data () {
		return {
			filterType: '0',
			filterOptions: [
				{ value: '0', text: 'All' },
				{ value: '1', text: 'Relief Center' },
				{ value: '2', text: 'Organization' },
				{ value: '3', text: 'Homelessness' }
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
		this.$store.dispatch('locations/searchLocations')
	},
	computed: {
		results: function () {
			return this.$store.state.locations.resultsList !== null
				? this.$store.state.locations.resultsList.map(loc => {
					return {
						id: loc.id,
						name: loc.name,
						suburb: loc.suburb,
						type: loc.type[loc.type.length - 2],
						coord: loc.location.substring(loc.location.indexOf('('), loc.location.indexOf(')')),
						website: loc.website
					}
				}).filter(loc => {
					if (this.filterType === '0') { return true }
					return loc.type === this.filterType
				}) : []
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
