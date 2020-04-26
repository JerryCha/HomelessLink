<template>
	<div>
		<h2>Search</h2>
		<b-form @submit="onSubmit">
			<b-form-row>
				<b-form-group label="Location">
					<div id="geocoder"></div>
				</b-form-group>
			</b-form-row>
			<b-form-row>
				<b-button @click="onLocate" variant="outline-secondary"><b-icon-cursor></b-icon-cursor>Where am I?</b-button>
			</b-form-row>
			<!--Already replaced by geocoder -->
			<!-- <b-form-group label="Location">
				<b-input-group>
					<b-form-input v-model="form.location"
												placeholder="Searching"></b-form-input>
					<b-input-group-append>
						<b-button @click="onLocate" variant="outline-secondary"><b-icon-cursor></b-icon-cursor></b-button>
					</b-input-group-append>
				</b-input-group>
			</b-form-group> -->
			<b-form-row>
				<b-form-group label="Type">
					<b-form-select v-model="form.interest" :options="interestOptions"></b-form-select>
				</b-form-group>
			</b-form-row>
			<!--
			<b-form-group label="Street">
				<b-form-input v-model="form.street"></b-form-input>
			</b-form-group>
			<b-form-row>
				<b-col>
					<b-form-group label="Unit No.">
						<b-form-input v-model="form.unitNo"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group label="Postcode">
						<b-form-input v-model="form.postcode"></b-form-input>
					</b-form-group>
				</b-col>
			</b-form-row>
			<b-form-group label="Name">
				<b-form-input v-model="form.name"></b-form-input>
			</b-form-group>
			-->
			<b-button type="submit"
								variant="primary">Search</b-button>
		</b-form>
	</div>
</template>

<script>
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

export default {
	name: 'search-form',
	data () {
		return {
			form: {
				location: '',
				interest: '0'
				/*	Disabled in iteration 1
				street: '',
				unitNo: '',
				postcode: '',
				name: ''
				*/
			},
			interestOptions: [
				{ value: '0', text: 'All' },
				{ value: '1', text: 'Relief Center' },
				{ value: '2', text: 'Organization' },
				{ value: '3', text: 'Homelessness' }
			]
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
		onSubmit: function (evt) {
			evt.preventDefault()
			this.$emit('on-submit-fired')
			var submitJson = {}
			submitJson.bound = this.$store.state.locations.viewBound
			submitJson.queryForm = this.form
			this.$store.dispatch('locations/setQueryParams', submitJson)
			this.$router.push(this.$route.path + '/search')
		},
		onLocate: function (evt) {
			navigator.geolocation.getCurrentPosition((pos) => {
				window.console.log('invoked getCurrentPosition')
				var coord = [pos.coords.longitude, pos.coords.latitude]
				this.$emit('on-locate-pressed', coord)
				this.$store.dispatch('locations/setCurrentLocation', coord)
			}, (err) => {
				window.console.error(err)
			})
		},
		initMapBoxGeoCoder: function () {
			const accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			const geocoder = new MapboxGeocoder({
				'accessToken': accessToken,
				'types': 'country,region,place,postcode,locality,neighborhood',
				'language': 'en-AU',
				'countries': 'au'
			})
			geocoder.addTo('#geocoder')
			geocoder.on('result', (e) => {
				window.console.log(e)
				this.form.location = ((placeName) => {
					// TODO: edge cases handling
					return placeName.split(',')[0]
				})(e.result.place_name)
				this.$store.dispatch('locations/setCurrentLocation', e.result.center)
			})
		}
	}
}
</script>

<style>
</style>
