<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="'/'">MatesHelp</b-navbar-brand>
      <b-navbar-toggle target="nav-menu"></b-navbar-toggle>
      <b-collapse id="nav-menu" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="'/'">Home</b-nav-item>
          <b-nav-item :to="'/itr1'">Search Locations</b-nav-item>
          <b-nav-item :to="'/itr2'">Suggestion</b-nav-item>
          <b-nav-item :to="'/about'">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
