<template>
  <div id="app">
    <Nav ref="navbar"/>
    <div id="content" :style="containerStyle">
      <router-view :mobile="mobile"/>
      <!-- <b-row>
        <b-col>
          <b-container class="mx-auto" style="width: 200px;">
            &copy; Prophetics 2020
          </b-container>
        </b-col>
      </b-row> -->
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
export default {
	name: 'app',
	components: {
		Nav
	},
	mounted () {
		// window.console.log(this.$refs.navbar)
		this.$store.dispatch('locations/setNavbar', this.$refs.navbar)
	},
	data () {
		return {
			// data field to indicate browsing device is mobile phone or desktop
			mobile: ((width) => {
				if (width < 576) return true
				return false
			})(document.body.clientWidth),
			// style object for container
			containerStyle: {
				// 'width': '100%',
				// 'height': ((width) => {
				// 	if (width < 576) {
				// 		return '80vh'
				// 	} else {
				// 		return '80vh'
				// 	}
				// })(document.body.clientWidth)
			}
		}
	},
	methods: {
	}
}
</script>

<style>
body {
  height: 100vh;
  margin: 0px;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #101010;
}
#content {
  /* margin-top: 1rem;
  margin-bottom: 1rem; */
}
@media screen and (max-width: 575px) {}
</style>
