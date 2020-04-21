<template>
  <b-card
    :title="name">
    <b-card-text>
      <p>{{ desc }}</p>
      <p>Address: {{ getAddress }}</p>
      <p>Email: {{ email }}</p>
			<router-link to="/itr1/detail/111">Detail</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
	name: 'poi-card',
	props: {
		id: String,
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

<style scoped>

</style>
