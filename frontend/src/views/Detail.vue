<template>
  <div>
    <h2>{{ poi.name }}</h2>
    <p>Suburb: {{ poi.suburb }}</p>
    <p>Website: {{ getWebsiteLink }}</p>
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
		window.console.log(`id=${this.$route.params.id}`)
		this.$store.dispatch('locations/getLocation', this.id)
	},
	destroyed () {
		this.$store.dispatch('locations/flushLocation')
	},
	data () {
		return {
			name: this.id,
			suburb: this.id,
			postcode: this.id
		}
	},
	computed: {
		getAddress: function () {
			return this.street + ', ' + this.suburb + ', ' + this.postcode
		},
		poi: function () {
			var loc = this.$store.state.locations.location
			return loc !== null
				? {
					name: loc.name,
					suburb: loc.suburb,
					type: loc.type[loc.type.length - 2],
					website: loc.website
				} : {}
		},
		coord: function () {
			var loc = this.$store.state.locations.location
			if (loc === null || loc === undefined)	{ return loc }
			var foo = loc.location.substring(loc.location.indexOf('(') + 1, loc.location.indexOf(')'))
				.split(' ')
				.map(p => Number(p))
			window.console.log(foo)
			return foo
		},
		getWebsiteLink: function () {
			return this.poi.website === null ? 'N/A' : this.poi.website
		}
	},
	methods: {
		goBack: function () {
			this.$router.go(-1)
		}
	},
	watch: {
		coord: {
			handler: function (newVal, oldVal) {
				this.$store.dispatch('locations/setCenterLocation', newVal)
			},
			deep: true
		}
	}
}
</script>

<style>

</style>
