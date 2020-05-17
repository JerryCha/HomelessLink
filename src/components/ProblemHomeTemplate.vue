<template>
  <b-container id="head-content">
    <div>
      <b-tabs content-class="mt-10 px-2" v-model="tabIndex">
        <b-tab title="Resource List" active>
          <b-row class="mb-4">
            <SubhomeBanner :title="topic" :subtitle="'Resource List'" :bgImg="bg"/>
          </b-row>
          <b-row align-h="center" align-v="center">
            <b-col v-html="$store.state.pages.pageData.description">
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Map">
          <MapListSection/>
        </b-tab>
      </b-tabs>
    </div>
  </b-container>
</template>

<script>
import SubhomeBanner from '@/components/SubhomeBanner'
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
			tabIndex: null
		}
	},
	mounted () {
		// console.log(this.$store.state.pageData.categories);
	},
	computed: {
		bg () {
			return this.$store.state.pages.pageData.banner_image
		},
		navbar () {
			return this.$store.state.locations.navbar
		},
		topic () {
			return this.$store.state.pages.pageData.name
		}
	},
	watch: {
		tabIndex (newVal, oldVal) {
			if (newVal === 1) {
				// window.console.log(this)
				this.$emit('on-map-activated')
			}
		}
	}
}
</script>
