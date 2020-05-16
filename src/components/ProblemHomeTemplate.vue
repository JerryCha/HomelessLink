<template>
  <b-container id="head-content">
    <div>
      <b-tabs content-class="mt-10 px-2">
        <b-tab title="Resource List" active>
          <b-row class="mb-4">
          <SubhomeBanner :title="topic" :subtitle="'Resource List'" :bgImg="bg"/>
        </b-row>
        <b-row align-h="center" align-v="center">
          <b-col v-html="$store.state.pageData.description">
          </b-col>
        </b-row>
      </b-tab>
        <b-tab title="Map">
          <MapListSection />
        </b-tab>
      </b-tabs>
    </div>
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
  mounted() {
    // console.log(this.$store.state.pageData.categories);
  },
  computed: {
    bg() {
      return this.$store.state.pageData.banner_image;
    },
		navbar () {
			return this.$store.state.locations.navbar;
		},
		topic () {
        return this.$store.state.pageData.name;
		}
	}
}
</script>
