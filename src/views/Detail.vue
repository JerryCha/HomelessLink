<template>
  <div id="detail-container">
    <h2>{{ poi.name }}</h2>
    <p>Suburb: {{ poi.suburb }}</p>
		<p>Address: {{ address }}</p>
    <p>Website: {{ getWebsiteLink }}</p>
    <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button>
  </div>
</template>

<script>
import axios from 'axios'
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
			address: '',
			mapbox: {
				accessToken: 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			}
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
					type: (() => {
						var tempSplitArr = loc.type.split('/')
						return Number(tempSplitArr[tempSplitArr.length - 2])
					})(),
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
		},
		reverseGeocoding: async function (coord) {
			const api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
			const type = 'locality'
			var query = api + `${coord[0]},${coord[1]}.json/?` + `type=${type}&access_token=${this.mapbox.accessToken}`
			var addr = null
			await axios.get(query)
				.then(res => {
					addr = res.data.features[0].place_name
				})
				.catch(e => { window.console.error(e) })
			return addr
		}
	},
	watch: {
		// Watching center coordinate change and update in time. Implemented due to async.
		coord: {
			handler: function (newVal, oldVal) {
				this.$store.dispatch('locations/setCenterLocation', newVal)
				this.reverseGeocoding(newVal)
					.then(addr => { this.address = addr })
			},
			deep: true
		}
	}
}
</script>

<style scoped>
</style>
