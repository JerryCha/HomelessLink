<template>
  <b-row>
    <b-col id="map" xs="12" sm="9">
      <Map ref="mapbox" :initCenter="[144.946457, -37.840935]" :mapHeight="getMapContainerHeight()"/>
    </b-col>
    <b-col id="subview" xs="12" sm="3">
      <router-view v-on:on-locate-pressed="handleOnLocatePressed"/>
    </b-col>
  </b-row>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import Map from '@/components/Map.vue'

export default {
	name: 'Home',
	components: {
		Map
	},
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		getMapContainerHeight: function () {
			if (this.mobile) return '40vh'
			return '80vh'
		},
		handleOnLocatePressed: function (coord) {
			window.console.log('parent: ' + coord)
			this.$refs.mapbox.setUserLocation()
		}
	},
	mounted () {
		window.console.log('is mobile? ' + this.mobile)
	}
}
</script>
