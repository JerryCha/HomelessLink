<template>
	<div>
		<div v-if="loadingStatus === 1" id="loading-overlap">
			<b-overlay :show="loadingStatus === 1"></b-overlay>
		</div>
		<div v-else-if="loadingStatus === 2" id="problem-subpage">
			<b-container id="head-content">
				<!-- <b-row class="mb-4">
					<SubhomeBanner :title="topic" :subtitle="'some subtitle'" :bgImg="bannerImg"/>
				</b-row> -->
				<b-row class="mb-4">
					<h1>{{ title }}</h1>
				</b-row>
				<b-row>
					<div v-html="desc"></div>
				</b-row>
			</b-container>
			<b-container fluid>
				<MapListSection />
			</b-container>
		</div>
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
	},
	computed: {
		navbar () {
			return this.$store.state.locations.navbar
		},
		topic () {
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
