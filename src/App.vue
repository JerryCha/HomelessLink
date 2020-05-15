<template>
  <div id="app">
    <Nav ref="navbar"/>
    <div id="content" :style="containerStyle">
      <router-view :mobile="false"/>
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
		this.$store.dispatch('locations/setNavbar', this.$refs.navbar)
	},
	data () {
		return {
			// data field to indicate browsing device is mobile phone or desktop
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
				// pageWidth: this.getViewportWidth()
			}
		}
	},
	methods: {
		// getViewportWidth: function () {
		// 	return document.body.clientWidth
		// }
	},
	computed: {
		// mobile () {
		// 	// if (this.pageWidth < 576) {
		// 	// 	return true
		// 	// }
		// 	return false
		// }
	}
}
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #101010;
	width: calc(100vw-10px);
}
#content {
	width: 100%;
}
@media screen and (max-width: 575px) {}
</style>
