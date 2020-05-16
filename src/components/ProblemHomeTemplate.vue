<template>
  <b-container id="head-content">
    <b-row class="mb-4">
      <SubhomeBanner :title="topic" :bgImg="bg"/>
    </b-row>
    <b-row align-h="center" align-v="center">
      <b-col>
        <PlaceHolder v-html="$store.state.pageData.description"/>
      </b-col>
    </b-row>
    <MapListSection />
  </b-container>
</template>

<script>
import SubhomeBanner from '@/components/SubhomeBanner'
import bnbg from '@/assets/ef_2_srgb.jpg'
import PlaceHolder from '@/components/Placeholder'
import MapListSection from '@/views/Home'

export default {
  components: {
    SubhomeBanner,
    MapListSection,
    PlaceHolder
  },
	data () {
		return {
			bg: bnbg
		}
	},
  computed: {
		navbar () {
			return this.$store.state.locations.navbar
		},
		topic () {
        return this.$store.state.pageData.name;
		}
	}
}
</script>
