<template>
	<div id="search-form">
		<div id="geocoder"></div>
		<b-button-group>
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
			evt.preventDefault()
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
			this.$store.dispatch('locations/searchLocations')
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
				// Emit event to parent component
				this.$emit('on-locate-pressed', coord)
				// Update current location
				this.$store.dispatch('locations/setCurrentLocation', coord)
			}, (err) => {
				window.console.error(err)
			})
		},
		// GeoCoder initialization
		initMapBoxGeoCoder: function () {
			const accessToken = this.mapbox.accessToken
			const geocoder = new MapboxGeocoder({
				'accessToken': accessToken,
				'types': 'country,region,place,postcode,locality,neighborhood',
				'language': 'en-AU',	// Set language to Australian English
				'countries': 'au'	// Restrict region to Australia
			})
			// Add geocoder plugin to DOM
			geocoder.addTo('#geocoder')
			// Setting result changed listener
			geocoder.on('result', (e) => {
				window.console.log(e)
				this.form.location = ((placeName) => {
					// TODO: edge cases handling
					return placeName.split(',')[0]
				})(e.result.place_name)
				// Update current location
				this.$store.dispatch('locations/setCenterLocation', e.result.center)
				// Update box bound of the suburb
				let newBound = ((boxArray) => {
					return {
						ne: boxArray.slice(2, 4),
						sw: boxArray.slice(0, 2)
					}
				})(e.result.bbox)
				this.$store.dispatch('locations/updateBoxBound', newBound)
			})
		},
		reverseGeocoding (coord) {
			const api = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
		}
	}
}
</script>

<style>
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
