<template>
	<div id="search-form">
		<div id="geocoder"></div>
		<b-button-group style="z-index: 102;">
			<b-button @click="onLocate"
								variant="outline-secondary">
				<b-icon-cursor></b-icon-cursor>
			</b-button>
			<b-button
					@click="onSubmit"
					variant="primary"><b-icon-search></b-icon-search></b-button>
		</b-button-group>
	</div>
</template>

<script>
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import axios from 'axios'

export default {
	name: 'search-form',
	props: {
		jump: Boolean
	},
	data () {
		return {
			form: {
				location: '',
				interest: '0'
			},
			mapbox: {
				accessToken: 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			}
		}
	},
	mounted () {
		this.initMapBoxGeoCoder()
	},
	computed: {
		// Not in use
		currentBound () {
			return this.$store.state.locations.currentBound
		}
	},
	methods: {
		// submiting query form.
		onSubmit: function (evt) {
			// Emit event to parent component
			this.$emit('on-submit-fired')
			// Create submit json form
			var submitJson = {}
			// Add map bound as area restriction
			submitJson.bound = this.$store.state.locations.boxBound
			// Add form as query conditions
			submitJson.queryForm = this.form
			// Set query params to store
			this.$store.dispatch('locations/setQueryParams', submitJson)
			// Set status to searching
			this.$store.dispatch('locations/setResultsCountToSearching')
			// Making query with backend
			// this.$store.dispatch('locations/searchLocations')
			this.$store.dispatch('locations/setSearchText',submitJson.queryForm.location)
			if (this.jump) {
				// Go to searching page.
				this.$router.push('/itr1')
			}
		},
		// Set current location to user location
		onLocate: function (evt) {
			navigator.geolocation.getCurrentPosition((pos) => {
				// Extract coordinate from GeolocationPosition
				var coord = [pos.coords.longitude, pos.coords.latitude]
				// Reverse geocoding
				this.reverseGeocoding(coord)
					.then((addr) => {
						// Emit event to parent component
						this.$emit('on-locate-pressed', coord)
						// Set geocoder query
						this.geocoder.query(addr)
						// Update current location
						this.$store.dispatch('locations/setCurrentLocation', coord)
					}, (err) => {
						window.console.error(err)
					})
			})
		},
		// GeoCoder initialization
		initMapBoxGeoCoder: function () {
			const accessToken = this.mapbox.accessToken
			const geocoder = new MapboxGeocoder({
				'accessToken': accessToken,
				'types': 'country,region,place,postcode,locality,neighborhood',
				'language': 'en-AU',	// Set language to Australian English
				'countries': 'au',	// Restrict region to Australia
				'bbox': [	// bbox for VIC, [sw, ne]. Retrived from mapbox geocoding
					140.948117800682, -39.2581179898835,
					150.055424999935, -33.9806470100642
				]
			})
			// Add geocoder plugin to DOM
			geocoder.addTo('#geocoder')
			// Setting result changed listener
			geocoder.on('result', (e) => {
				this.form.location = ((placeName) => {
					// TODO: edge cases handling
					return placeName.split(',')[0]
				})(e.result.place_name)
				if(e.result.place_name){
					this.$store.dispatch('locations/setSearchText',e.result.place_name.split(",")[0])
				}
				// Update current location
				this.$store.dispatch('locations/setCenterLocation', e.result.center)
				// Update box bound of the suburb
				let newBound = ((boxArray) => {
					return {
						ne: boxArray.slice(2, 4),
						sw: boxArray.slice(0, 2)
					}
				})(e.result.bbox)
				// Update the bound to suburb bound while query using geocoder
				this.$store.dispatch('locations/updateBoxBound', newBound)
				// this.onSubmit()
			})
			this.geocoder = geocoder
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
	}
}
</script>

<style>
div {
	box-sizing: border-box;
}
#search-form {
	display: flex;
}
#geocoder {
	width: 100%;
}
.mapboxgl-ctrl-geocoder {
	min-width: 100%;
	min-height: 38px;
	box-shadow: 0 0 0 0;
}
.mapboxgl-ctrl-geocoder--input {
	border: 1px solid #ced4da;
	border-radius: 0.25rem;
	min-height: 38px;
}
</style>
