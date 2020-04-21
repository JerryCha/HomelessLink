<template>
  <div id="map-container" :style="styleObj"></div>
</template>

<script>
import MapBox from 'mapbox-gl'

export default {
	name: 'Map',
	components: {
		MapBox
	},
	props: {
		centerLat: Number,
		centerLng: Number,
		mapWidth: {
			type: String,
			default: '100%'
		},
		mapHeight: {
			type: String,
			default: '100%'
		}
	},
	data () {
		return {
			poiList: [],
			styleObj: {
				'min-width': this.mapWidth,
				'max-width': this.mapWidth,
				'min-height': this.mapHeight,
				'max-height': this.mapHeight
			}
		}
	},
	methods: {
		initMapBox: function () {
			MapBox.accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			var map = new MapBox.Map({
				container: 'map-container',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [this.centerLng, this.centerLat],
				zoom: 11
			})
		}
	},
	mounted () {
		this.initMapBox()
	}
}
</script>

<style>
@import url(https://api.mapbox.com/mapbox-gl-js/v1.8.1/mapbox-gl.css);
</style>
