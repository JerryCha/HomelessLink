<template>
  <div id="view-container">
    <MapBox id="mapbox" ref="mapbox" :initCenter="[144.946457, -37.840935]"/>
    <div id="side-panel">
			<SearchForm id="search-form"
				:jump="false"
				@on-locate-pressed="handleOnLocatePressed"
        @on-submit-fired="handleOnSubmit"
			/>
			<router-view id="subview" />
    </div>
  </div>
</template>

<style scoped>
#view-container {
	display: flex;
	/* flex-wrap: wrap; */
	margin-left: 1rem;
	margin-right: 2rem;
}
#side-panel {
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	min-width: 320px;
}
#search-form {
	height: 38px;
}
#subview {
	height: 90%;
	padding-top: 1rem;
	padding-bottom: 1rem;
}
@media screen and ( max-width: 575px ) {
	#mapbox {
		height: 30vh;
		width: 100%;
	}
	#side-panel {
		height: 60vh;
		width: 100%;
	}
}
@media screen and ( min-width: 576px ) {
	#mapbox {
		height: 85vh;
		width: 70vw;
	}
	#side-panel {
		height: 85vh;
		width: 30vw;
	}
}
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
