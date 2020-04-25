<template>
  <div id="map-container" :style="styleObj">
	</div>
</template>

<script>
import MapBox from 'mapbox-gl'
import geobox from '@/util/geobox'
import locationIcon from '@/assets/location.png'
import poiIcon from '@/assets/location_poi.png'

export default {
	name: 'Map',
	components: {
		MapBox
	},
	props: {
		initCenter: Array,
		mapWidth: {
			type: String,
			default: '100%'
		},
		mapHeight: String
	},
	data () {
		return {
			userLocationMarker: null,
			poiList: [
				{
					'name': 'Library Services',
					'type': 2,
					'coord': [145.02291, -37.8800209],
					'url': null,
					'suburb': 'Caulfield'
				}
			],
			styleObj: {
				'min-width': this.mapWidth,
				'max-width': this.mapWidth,
				'min-height': this.mapHeight,
				'max-height': this.mapHeight
			}
		}
	},
	computed: {
		center () {
			var coord = this.$store.state.locations.centerLocation
			window.console.log(`computed: ${coord}`)
			return coord === null ? coord : this.initCenter
		},
		poiLocations () {
			return this.$store.state.locations.locations
		}
	},
	watch: {
		center: {
			handler: function (newCenter, oldCenter) {
				window.console.log(`location change detected: ${oldCenter} -> ${newCenter}`)
				this.changeMapCenter(this.$store.state.locations.centerLocation)
			},
			deep: true
		}
	},
	methods: {
		initMapBox: function () {
			MapBox.accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			const map = new MapBox.Map({
				container: 'map-container',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: this.initCenter,
				zoom: 13
			})
			map.on('load', this.updateViewBound)
			this.map = map
		},
		changeMapCenter: function (destCoord) {
			// Update the boundary of viewing area after moved.
			this.map.on('moveend', () => { this.updateViewBound() })
			this.map.flyTo({
				center: destCoord,
				essential: true
			})
		},
		setUserLocation: function () {
			// TODO: optimize the replacement process in next iteration
			if (this.map.getLayer('userLocation')) { this.map.removeLayer('userLocation') }
			if (this.map.getSource('userLocation')) { this.map.removeSource('userLocation') }
			if (this.map.hasImage('userLocation')) { this.map.removeImage('userLocation') }
			this.map.loadImage(locationIcon, (err, img) => {
				if (err) throw err
				this.map.addImage('userLocation', img)
				this.map.addSource('userLocation', geobox.buildMapboxSource(this.$store.state.locations.currentLocation))
				this.map.addLayer({
					'id': 'userLocation',
					'type': 'symbol',
					'source': 'userLocation',
					'layout': {
						'icon-image': 'userLocation',
						'icon-size': 0.5
					}
				})
			})
		},
		updateViewBound: function () {
			var bound = [
				this.map.getBounds().getNorthWest().toArray(),
				this.map.getBounds().getSouthEast().toArray()
			]
			this.$store.dispatch('locations/updateViewBound', bound)
		},
		setPoiOnMap: function () {
			const poiLocations = this.$store.state.locations.locations
			// TODO: optimize the replacement process in next iteration
			if (this.map.getLayer('poiLocations')) { this.map.removeLayer('poiLocations') }
			if (this.map.getSource('poiLocations')) { this.map.removeSource('poiLocations') }
			if (this.map.hasImage('poiLocations')) { this.map.removeImage('poiLocations') }
			this.map.loadImage(poiIcon, (err, img) => {
				if (err) throw err
				this.map.addImage('poiLocations', img)
				this.map.addSource('poiLocations', geobox.buildMapboxSource(poiLocations))
				this.map.addLayer({
					'id': 'poiLocations',
					'type': 'symbol',
					'source': 'poiLocations',
					'layout': {
						'icon-image': 'poiLocations',
						'icon-size': 0.5
					}
				})
			})
		}
	},
	mounted () {
		this.initMapBox()
		this.$store.dispatch('locations/setCenterLocation', this.initCenter)
	}
}
</script>

<style>
@import url(https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css);
</style>
