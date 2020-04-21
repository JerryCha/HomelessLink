<template>
  <div id="map-container"></div>
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
		centerLong: Number
	},
	data () {
		return {}
	},
	methods: {
		initMapBox: function () {
			MapBox.accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			var map = new MapBox.Map({
				container: 'map-container',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [this.centerLong, this.centerLat],
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

#map-container {
    height: 100%;
}
</style>
