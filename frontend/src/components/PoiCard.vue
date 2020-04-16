<template>
  <b-card
    :title="name">
    <b-card-text>
      <p>{{desc}}</p>
      <p>Address: {{getAddress}}</p>
      <p>Email: {{email}}</p>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
	name: 'poi-card',
	props: {
		name: String,
		desc: String,
		street: String,
		suburb: String,
		postcode: String,
		email: String,
		phone: String
	},
	computed: {
		getAddress: function () {
			return this.street + ', ' + this.suburb + ', ' + this.postcode
		}
	}
}
</script>

<style>

</style>
