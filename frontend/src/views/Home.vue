<template>
  <b-row>
    <b-col xs="12" sm="8">
      <MapBox ref="mapbox" :initCenter="[144.946457, -37.840935]" :mapHeight="getMapContainerHeight()"/>
    </b-col>
    <b-col id="subview" xs="12" sm="4">
			<SearchForm
				:jump="false"
				@on-locate-pressed="handleOnLocatePressed"
        @on-submit-fired="handleOnSubmit"
			/>
			<router-view />
    </b-col>
  </b-row>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import SearchForm from '@/components/SearchForm.vue'
import MapBox from '@/components/Map.vue'

export default {
	name: 'Home',
	components: {
		MapBox,
		SearchForm
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
		// Accepting onLocate emitted from SearchForm, informing map to change the location.
		handleOnLocatePressed: function (coord) {
			this.$refs.mapbox.setUserLocation()
		},
		// Accepting onSubmit emitted from SearchForm, informing map to update the center coordinate.
		handleOnSubmit: function () {
			this.$refs.mapbox.updateCenterCoord()
		}
	},
	mounted () {
		window.onresize = () => {
			// this.$refs.mapbox.resizeMap()
		}
	}
}
</script>
