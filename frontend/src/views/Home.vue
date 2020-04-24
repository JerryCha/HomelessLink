<template>
  <b-row>
    <b-col id="map" xs="12" sm="8">
      <Map :centerLat="-37.840935" :centerLng="144.946457"/>
    </b-col>
    <b-col id="subview" xs="12" sm="4">
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
	}
}
</script>
