<template>
  <b-row>
    <b-col cols="8">
      <!--<Map :centerLat="-37.840935" :centerLong="144.946457"/>-->
      <router-view />
    </b-col>
    <b-col cols="4">
      <router-view />
    </b-col>
  </b-row>
</template>

<script>
export default {
	name: 'search'
}
</script>

<style>

</style>
