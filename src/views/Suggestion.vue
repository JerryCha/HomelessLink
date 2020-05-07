<template>
  <div class="container">
    <b-row>
      <b-col>
        <b-img v-bind="mainProps" blank-color="#777"></b-img>
      </b-col>
      <b-col>
        <h2>Essential Services</h2>
        <p>If you are experiencing difficulty of your daily life,
          check out the support center which could offer sheltering service, free food, and shower room.
          (sample description) </p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-img v-bind="mainProps" blank-color="#777"></b-img>
      </b-col>
      <b-col>
        <h2>Essential Services</h2>
        <p>If you are experiencing difficulty of your daily life,
          check out the support center which could offer sheltering service, free food, and shower room.
          (sample description) </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
	name: 'suggestion-view',
	data () {
		return {
			mainProps: { blank: true, width: 200, height: 200, class: 'ml' }
		}
	}
}
</script>

<style>

</style>
