<template>
  <div id="app">
    <div id="nav">
      <h1>MatesHelp</h1>
      <router-link to="/">Home</router-link> |
      <router-link to="/itr1">Iteration 1</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/about">About</router-link>
      <p>Above nav is for debugging</p>
    </div>
    <b-container id="content" :style="containerStyle">
      <router-view/>
    </b-container>
    <div id="footer">
      <p>Team: B9-Prophetic</p>
    </div>
  </div>
</template>

<script>
export default {
	name: 'app',
	mounted () {
	},
	data () {
		return {
			containerStyle: {
				'width': '100%',
				'height': ((width) => {
					if (width < 575) {
						return '60vh'
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
@media screen and (max-width: 575px) {
  #nav {
    display: none;
  }}/*
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/*
#footer {
  position: relative;
  bottom: 2rem;
}
*/
</style>
