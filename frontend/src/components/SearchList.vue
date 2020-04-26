<template>
  <div>
    <div id="result-list">
      <PoiCard class="result-card" v-for="(poi, idx) in results"
                :key="idx"
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
	methods: {
		goBack: function () {
			this.$store.dispatch('locations/set')
			this.$router.go(-1)
		},
		retriveData: function () {
			window.console.log(this.results)
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
						name: loc.name,
						suburb: loc.suburb,
						type: loc.type[loc.type.length - 2],
						coord: loc.location.substring(loc.location.indexOf('('), loc.location.indexOf(')')),
						website: loc.website
					}
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
</style>
