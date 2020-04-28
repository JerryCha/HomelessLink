<template>
  <div id="detail-container">
    <h2>{{ poi.name }}</h2>
    <p>Suburb: {{ poi.suburb }}</p>
    <p>Website: {{ getWebsiteLink }}</p>
    <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button>
  </div>
</template>

<script>
export default {
	name: 'detail',
	props: {
		id: String
	},
	mounted () {
		this.$store.dispatch('locations/getLocation', this.id)
	},
	destroyed () {
		// Setting location to null once the view is destroyed
		this.$store.dispatch('locations/flushLocation')
	},
	data () {
		return {
			name: this.id,
			suburb: this.id,
			postcode: this.id
		}
	},
	computed: {
		// Retrive the location from store, if it is null return an empty object ({})
		poi: function () {
			var loc = this.$store.state.locations.location
			// loc is null ? reformated object : empty object
			return loc !== null
				? {
					name: loc.name,
					suburb: loc.suburb,
					type: loc.type[loc.type.length - 2],
					website: loc.website
				} : {}
		},
		// Coordinate of location. Extracted specially for map shown.
		coord: function () {
			var loc = this.$store.state.locations.location
			if (loc === null || loc === undefined)	{ return loc }
			var coord = loc.location.substring(loc.location.indexOf('(') + 1, loc.location.indexOf(')'))
				.split(' ')
				.map(p => Number(p))
			return coord
		},
		// website link. 'N/A' if null.
		getWebsiteLink: function () {
			return this.poi.website === null ? 'N/A' : this.poi.website
		}
	},
	methods: {
		goBack: function () {
			this.$router.go(-1)
		}
	},
	watch: {
		// Watching center coordinate change and update in time. Implemented due to async.
		coord: {
			handler: function (newVal, oldVal) {
				this.$store.dispatch('locations/setCenterLocation', newVal)
			},
			deep: true
		}
	}
}
</script>

<style scoped>
</style>
