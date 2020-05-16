<template>
  <div>
    <ProblemHomeTemplate v-if="$store.state.pageData !== null"/>
  </div>
</template>

<script>
import ProblemHomeTemplate from '@/components/ProblemHomeTemplate'
import axios from 'axios'
import API from '@/api/api'

export default {
	name: 'problem-home',
	components: {
    ProblemHomeTemplate
	},
	props:{
    'problem': {
      type: String
    },
  },
  data() {
    return {
      currentID: null
    }
  },
	methods: {
    updateapiData(){
      const that = this;
      axios.get(API.PAGE.PAGE_API() + this.$route.params.problem).then(function(response) {
        that.$store.commit("addPageData",response.data);
      })
      this.currentID = this.$route.params.problem;
    }
	},
  updated(){
      this.updateapiData();
  },
	mounted () {
		this.navbar.setToLightMode();
    this.updateapiData();
	},
	computed: {
		navbar () {
			return this.$store.state.locations.navbar
		},
		topic () {
      this.updateapiData();
			return null;
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
