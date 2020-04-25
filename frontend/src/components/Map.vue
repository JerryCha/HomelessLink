<template>
  <div id="map-container" :style="styleObj">
		<b-button @click="setPoiOnMap">test</b-button>
	</div>
</template>

<script>
import MapBox from 'mapbox-gl'

export default {
	name: 'Map',
	components: {
		MapBox
	},
	props: {
		center: Array,
		mapWidth: {
			type: String,
			default: '100%'
		},
		mapHeight: String
	},
	data () {
		return {
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
	methods: {
		initMapBox: function () {
			MapBox.accessToken = 'pk.eyJ1IjoiamVycnljaGEiLCJhIjoiY2sxNXNldmdmMHlibjNjdGM4MnAyZHR4aCJ9.OjElwhEEogXkUfGOgpX3mA'
			const map = new MapBox.Map({
				container: 'map-container',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: this.center,
				zoom: 12
			})
			this.map = map
		},
		setPoiOnMap: function () {
			const map = this.map
			window.console.log('before mapOnLoad' + map)
			const marker = new MapBox.Marker().setLngLat(this.$store.state.locations.currentLocation).addTo(map)
			window.console.log(marker)
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
