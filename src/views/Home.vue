<template>
  <div id="view-container">
    <MapBox id="mapbox" ref="mapbox" :initCenter="[144.946457, -37.840935]"/>
    <div id="side-panel">
			<SearchForm id="search-form"
				:jump="false"
				@on-locate-pressed="handleOnLocatePressed"
        @on-submit-fired="handleOnSubmit"
				@map-activated="updateMapSize"
			/>
			<router-view id="subview" />
    </div>
  </div>
</template>

<style scoped>

#side-panel {
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	min-width: 320px;
}
#search-form {
	height: 38px;
}
#subview {
	height: calc(100% - 38px);
	padding-top: 1rem;
	padding-bottom: 1rem;
	/* overflow-y: scroll; */
}
#view-container {
	display: flex;
}
#view-container {
		margin-left: 1rem;
		margin-right: 2rem;
	}
	#mapbox {
		height: 85vh;
		width: calc(100% - 360px);
	}
	#side-panel {
		height: 85vh;
		width: 360px;
	}
@media screen and ( max-width: 575px ) {
	#view-container {
		flex-direction: column;
		margin-left: 1rem;
		margin-right: 2rem;
	}
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
	#view-container {
		margin-left: 1rem;
		margin-right: 2rem;
	}
	#mapbox {
		height: 85vh;
		width: calc(100% - 360px);
	}
	#side-panel {
		height: 85vh;
		width: 360px;
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
		},
		updateMapSize: function () {
			this.$refs.mapbox.resizeMap()
		}
	},
	mounted () {
	}
}
</script>
