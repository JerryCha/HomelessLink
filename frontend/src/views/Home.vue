<template>
  <b-row>
    <b-col cols="8">
      <Map :centerLat="-37.840935" :centerLong="144.946457"/>
    </b-col>
    <b-col cols="4">
      <SearchForm />
    </b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Map from '@/components/Map.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    Map,
    SearchForm
  }
}
</script>
