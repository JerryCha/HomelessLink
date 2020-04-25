<template>
  <b-row>
    <b-col id="map" xs="12" sm="9">
      <Map :initCenter="[144.946457, -37.840935]" :mapHeight="getMapContainerHeight()"/>
    </b-col>
    <b-col id="subview" xs="12" sm="3">
      <router-view />
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
			if (this.mobile) return '20vh'
			return '80vh'
		}
	},
	mounted () {
		window.console.log('is mobile? ' + this.mobile)
	}
}
</script>
