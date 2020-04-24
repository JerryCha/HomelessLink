<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ desc }}</p>
    <p>Address: {{ getAddress }}</p>
    <p>Email: {{ email }}</p>
    <p>Phone: {{ phone }}</p>
    <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button>
  </div>
</template>

<script>
export default {
	name: 'detail',
	props: {
		id: String
	},
	mounted () {
		this.$store.dispatch('locations/getLocation', this.id)
	},
	destroyed () {
		this.$store.dispatch('locations/flushLocation')
	},
	data () {
		return {
			name: this.id,
			desc: this.id + this.id + this.id,
			street: this.id + this.id,
			suburb: this.id,
			postcode: this.id,
			email: this.id + '@example.com',
			phone: '+61 45' + this.id + this.id
		}
	},
	computed: {
		getAddress: function () {
			return this.street + ', ' + this.suburb + ', ' + this.postcode
		}
	},
	methods: {
		goBack: function () {
			this.$router.go(-1)
		}
	}
}
</script>

<style>

</style>
