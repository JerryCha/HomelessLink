<template>
  <div id="app">
    <Nav />
    <b-container id="content" :style="containerStyle">
      <router-view :mobile="mobile"/>
    </b-container>
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
	},
	data () {
		return {
			mobile: ((width) => {
				if (width < 576) return true
				return false
			})(document.body.clientWidth),
			containerStyle: {
				'width': '100%',
				'height': ((width) => {
					if (width < 576) {
						return '80vh'
					} else {
						return '80vh'
					}
				})(document.body.clientWidth)
				// 'overflow-y': 'hidden'
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#content {
  margin: 1rem auto;  /* vertical horizontal */
}
@media screen and (max-width: 575px) {}
/*
  #content {
    width: 95%;
    height: 60vh;
    margin: 1rem auto;
  }
}
@media screen and (min-width: 576px) {
  #content {
    width: 95%;
    height: 80vh;
    margin: 1rem auto;
  }
}*/

/*
#footer {
  position: relative;
  bottom: 2rem;
}
*/
</style>
