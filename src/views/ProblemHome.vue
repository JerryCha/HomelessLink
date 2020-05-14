<template>
  <div>
    <b-container id="head-content">
      <b-row class="mb-4">
        <SubhomeBanner :title="topic" :subtitle="'some subtitle'" :bgImg="bg"/>
      </b-row>
      <b-row align-h="center" align-v="center">
        <b-col xs="12" sm="4"><PlaceHolder boxWidth="300px" boxHeight="300px" /></b-col>
        <b-col xs="12" sm="4"><PlaceHolder boxWidth="300px" boxHeight="300px" /></b-col>
        <b-col xs="12" sm="4"><PlaceHolder boxWidth="300px" boxHeight="300px" /></b-col>
      </b-row>
    </b-container>
		<!-- <MapListSection /> -->
  </div>
</template>

<script>
import SubhomeBanner from '@/components/SubhomeBanner'
import bnbg from '@/assets/ef_2_srgb.jpg'
import PlaceHolder from '@/components/Placeholder'
import MapListSection from '@/views/Home'
import axios from 'axios'
import API from '@/api/api'

export default {
	name: 'problem-home',
	components: {
		SubhomeBanner,
		MapListSection,
		PlaceHolder
	},
	props: {
    apiData: Object
	},
	data () {
		return {
			bg: bnbg
		}
	},
	methods: {
    updateapiData(){
      const that = this;
      axios.get(API.PAGE.PAGE_API() + this.$route.params.problem).then(function(response) {
        console.log(response.data);
      })
    }
	},
	mounted () {
		this.navbar.setToLightMode()
	},
	computed: {
		navbar () {
			return this.$store.state.locations.navbar
		},
		topic () {
      this.updateapiData();
			return this.$route.params.problem
		}
	},
	watch: {
		// topic: function (newVal, oldVal) {
		// 	this.$route.go()
		// }
	}
}
</script>

<style>
#head-content {
  height: calc(100vh - 56px);
}
</style>
