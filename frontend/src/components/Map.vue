<template>
  <div id="map-container" :style="styleObj">
	</div>
</template>

<script>
import MapBox from 'mapbox-gl'
import geobox from '@/util/geobox'
import locationIcon from '@/assets/location_user.png'
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
			styleObj: {
				'width': this.mapWidth,
				'height': this.mapHeight
			},
			prevZoomLevel: 13
		}
	},
	computed: {
		// Map center coordinate
		center () {
			var coord = this.$store.state.locations.centerLocation
			return coord === null ? coord : this.initCenter
		},
		poiLocation () {
			return this.$store.state.locations.location
		},
		// Point of interests
		poiLocations () {
			return this.$store.state.locations.resultsList
		},
		// Number of points of interests
		poiLocationsCount () {
			return this.$store.state.locations.resultsCount
		}
	},
	watch: {
		// Center coordinate watcher
		center: {
			handler: function (newCenter, oldCenter) {
				if (this.poiLocation === null) {
					this.flyToCenter(this.$store.state.locations.centerLocation)
				} else {
					this.flyZoomToCenter(this.$store.state.locations.centerLocation, 16)
				}
			},
			deep: true
		},
		poiLocation (newState, oldState) {
			if (newState === null) {
				this.zoomTo(this.prevZoomLevel)
			}
		},
		// Count of POI change watcher. Once updated, remove the marker and set the new ones
		poiLocationsCount (newState, oldState) {
			this.removeMarker('poiLocations')
			if (newState !== 0) {
				this.setPoiOnMap()
			}
		}
	},
	methods: {
		// Mapbox-gl initialization
		initMapBox: function () {
			MapBox.accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			const map = new MapBox.Map({
				container: 'map-container',
				style: 'mapbox://styles/jerrycha/ck9i9jbdg02sq1io1c01t4f73',
				center: this.initCenter,
				zoom: 13,
				pitch: 45
			})
			// Adding zoom control
			map.addControl(new MapBox.NavigationControl())
			// TODO: Remove update bound code
			map.on('load', () => {
				this.updateViewBound()
			})
			// TODO: Remove update bound code
			map.on('resize', () => {
				this.updateViewBound()
				this.updateCenterCoord()
			})
			map.on('zoomstart', () => {
				this.prevZoomLevel = map.getZoom()
			})
			this.map = map
		},
		zoomTo (newZoomLevel) {
			this.map.zoomTo(newZoomLevel, {
				duration: 1000
			})
		},
		resizeMap: function () {
			this.map.resize()
		},
		flyToCenter: function (destCoord) {
			this.map.flyTo({
				center: destCoord,
				essential: true
			})
		},
		flyZoomToCenter: function (destCoord, zoom) {
			// TODO: Remove update bound code
			this.map.on('moveend', () => {
				this.updateViewBound()
			})
			// Fly to the new coordinate
			this.map.flyTo({
				center: destCoord,
				zoom: zoom,
				essential: true
			})
		},
		// Set user's current location marker
		setUserLocation: function () {
			// TODO: optimize the replacement process in next iteration
			// Remove the marker if already has one
			this.removeMarker('userLocation')
			// Adding new makrer
			this.map.loadImage(locationIcon, (err, img) => {
				if (err) throw err
				this.map.addImage('userLocation', img)
				this.map.addSource('userLocation', geobox.buildMapboxSource([this.$store.state.locations.currentLocation]))
				this.map.addLayer({
					'id': 'userLocation',
					'type': 'symbol',
					'source': 'userLocation',
					'layout': {
						'icon-image': 'userLocation',
						'icon-allow-overlap': true,
						'icon-size': 0.25
					}
				})
			})
		},
		removeMarker: function (name) {
			if (this.map.getLayer(name)) { this.map.removeLayer(name) }
			if (this.map.getSource(name)) { this.map.removeSource(name) }
			if (this.map.hasImage(name)) { this.map.removeImage(name) }
		},
		// Update the view bound. TODO: Remove if not necessary
		updateViewBound: function () {
			// Get bound
			var bound = {
				'ne': this.map.getBounds().getNorthEast().toArray(),
				'sw': this.map.getBounds().getSouthWest().toArray()
			}
			// Update
			// this.$store.dispatch('locations/updateBoxBound', bound)
			window.console.warn('[Map] bound coordinate now is no longer updated as map view moved. Remember to delete corresponding code')
		},
		// Update center coordination
		updateCenterCoord: function () {
			// Get center coord of current view, and update to store
			this.$store.dispatch('locations/setCenterLocation', this.map.getCenter().toArray())
		},
		// Set POI marker on map
		setPoiOnMap: function () {
			// Extracting the locations from shown results list
			var poiLocations =
				this.$store.state.locations.resultsList
					.map(loc => {
						return {
							name: loc.name,
							coord: loc.location.substring(loc.location.indexOf('(') + 1, loc.location.indexOf(')'))
								.split(' ')
								.map(p => Number(p))
						}
					})
			// TODO: optimize the replacement process in next iteration
			this.removeMarker('poiLocations')
			this.map.loadImage(poiIcon, (err, img) => {
				if (err) throw err
				this.map.addImage('poiLocations', img)
				this.map.addSource('poiLocations', geobox.buildMapboxSource(poiLocations))
				this.map.addLayer({
					'id': 'poiLocations',
					'type': 'symbol',
					'source': 'poiLocations',
					'layout': {
						'text-field': ['get', 'description'],
						'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
						'text-justify': 'auto',
						'text-radial-offset': 0.5,
						'icon-image': 'poiLocations',
						'icon-allow-overlap': true,	// Allow overlapping, avoid marker hidden at different zoom levels
						'icon-size': 0.5
					}
				})
			})
		}
	},
	mounted () {
		this.initMapBox()
		// update center location after mounted
		this.$store.dispatch('locations/setCenterLocation', this.initCenter)
	}
}
</script>

<style>
@import url(https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css);
</style>
