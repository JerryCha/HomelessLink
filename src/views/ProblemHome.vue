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
			return this.$store.state.locations.navbar;
		},
		topic () {
      this.updateapiData();
			return null;
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
