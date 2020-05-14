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
			loadingStatus: 0,	// 0: Not request, 1: requesting, 2: finished, 3: error
			problemId: -1,
			bannerImg: bnbg,
			title: '',
			desc: ''
			// Category to write in store
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
	created () {
		this.loadingStatus = 1
		axios.get(API.PAGE.GET_PAGE(1))
			.then((res) => {
				window.console.log(res.data)
				this.problemId = res.data.id
				this.bannerImg = res.data.banner_image
				this.title = res.data.name
				this.desc = res.data.description
				this.loadingStatus = 2
				// TODO: Push categories to store
			})
			.catch((r) => {
				window.console.error(r)
				this.loadingStatus = 3
			})
	},
	mounted () {
		setTimeout(() => this.navbar.setToLightMode(), 10)
		window.scrollTo(0, 0)	// (x, y)
		window.console.log('mounted again')
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
		loadingStatus (newVal, oldVal) {

		}
	}
}
</script>

<style scoped>
#loading-overlap {
	width: 96vw;
	height: 98vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(244,245,246,1);
}
#problem-subpage {
	padding: 1rem 0.5rem;
	background-color: rgba(244,245,246,1);
}
</style>
