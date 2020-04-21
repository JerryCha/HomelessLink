<template>
	<div>
		<h2>Search</h2>
		<b-form @submit="onSubmit">
			<b-form-group label="Location">
				<b-input-group>
					<b-form-input v-model="form.location"
												placeholder="Searching"></b-form-input>
					<b-input-group-append>
						<b-button @click="onLocate" variant="outline-secondary"><b-icon-cursor></b-icon-cursor></b-button>
					</b-input-group-append>
				</b-input-group>
			</b-form-group>
			<b-form-group label="Type">
				<b-form-select v-model="form.interest" :options="interestOptions"></b-form-select>
			</b-form-group>
			<b-form-group label="Street">
				<b-form-input v-model="form.street"></b-form-input>
			</b-form-group>
			<b-form-row>
				<b-col>
					<b-form-group label="Unit No.">
						<b-form-input v-model="form.unitNo"></b-form-input>
					</b-form-group>
				</b-col>
				<b-col>
					<b-form-group label="Postcode">
						<b-form-input v-model="form.postcode"></b-form-input>
					</b-form-group>
				</b-col>
			</b-form-row>
			<b-form-group label="Name">
				<b-form-input v-model="form.name"></b-form-input>
			</b-form-group>
			<b-button type="submit"
								variant="primary">Search</b-button>
		</b-form>
	</div>
</template>

<script>

export default {
	name: 'search-form',
	data () {
		return {
			form: {
				location: '',
				interest: 'relief',
				street: '',
				unitNo: '',
				postcode: '',
				name: ''
			},
			interestOptions: [
				{ value: 'relief', text: 'Relief Center' },
				{ value: 'organization', text: 'Organization' },
				{ value: 'homeless', text: 'Homelessness' }
			],
			status: 'ready'
		}
	},
	methods: {
		onSubmit: function (evt) {
			evt.preventDefault()
			window.alert(JSON.stringify(this.form))
			this.$router.push(this.$route.path + '/search')
		},
		onLocate: function (evt) {
			navigator.geolocation.getCurrentPosition((pos) => {
				window.console.log('invoked')
				window.alert('location: [' + pos.coords.latitude + ',' + pos.coords.longitude + ']')
			}, (err) => {
				window.console.log(err)
			})
		}
	}
}
</script>

<style>
</style>
