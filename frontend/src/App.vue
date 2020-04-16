<template>
  <div id="app">
    <div id="nav">
      <h1>Homeless Link</h1>
      <router-link to="/">Home</router-link>
    </div>
    <b-container id="content">
      <router-view/>
    </b-container>
    <div>
      <p>Team: B9-Prophetic</p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#content {
  width: 95%;
  margin: 1rem auto;
}

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
</style>
