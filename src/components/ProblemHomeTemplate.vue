<template>
    <div>
      <b-tabs content-class="my-2" v-model="tabIndex">
        <b-tab title="Resource List">
          <b-container id="head-content">
          <b-row class="mb-4">
            <SubhomeBanner :title="topic" :subtitle="'Resource List'" :bgImg="bannerImg"/>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col v-html="$store.state.pages.pageData.description">
            </b-col>
          </b-row>
          </b-container>
        </b-tab>
        <b-tab title="Map" active>
          <b-container class="no-padding fulfill-vertical-space" fluid>
            <MapListSection/>
          </b-container>
        </b-tab>
      </b-tabs>
    </div>
</template>

<script>
import SubhomeBanner from '@/components/SubhomeBanner'
import MapListSection from '@/views/Home'

export default {
	components: {
		SubhomeBanner,
		MapListSection
	},
	props: {
		bannerImg: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			tabIndex: null	// Current activated tab index
		}
	},
	mounted () {
	},
	computed: {
		// Background image url of banner.
		bg () {
			return this.$store.state.pages.pageData.banner_image
		},
		// Navbar reference
		// navbar () {
		// 	return this.$store.state.locations.navbar
		// },
		topic () {
			return this.$store.state.pages.pageData.name
		}
	},
	watch: {
		tabIndex (newVal, oldVal) {
			this.$store.dispatch('pages/setCurrentTab', this.tabIndex)
		}
	}
}
</script>

<style scoped>
.no-padding {
  padding: 0px 0px;
}
.fulfill-vertical-space {
  height: calc(100vh - 98.53px - 42px - 6px);
}
</style>
