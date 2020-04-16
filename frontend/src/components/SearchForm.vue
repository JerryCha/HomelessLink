<template>
	<div>
		<h2>More Details</h2>
		<b-form @submit="onSubmit">
			<b-form-group label="Location">
				<b-form-input v-model="form.location"
											placeholder="Searching"></b-form-input>
			</b-form-group>
			<b-form-group label="Choose at least one">
				<b-form-radio v-model="form.interest"
											value="ReliefCenter">Relief Center</b-form-radio>
				<b-form-radio v-model="form.interest"
											value="Organization">Organization</b-form-radio>
				<b-form-radio v-model="form.interest"
											value="Homelessness">Homelessness</b-form-radio>
			</b-form-group>
			<b-form-group label="Street">
				<b-form-input v-model="form.street"></b-form-input>
			</b-form-group>
			<b-form-row>
				<b-form-group label="Unit No.">
					<b-form-input v-model="form.unitNo"></b-form-input>
				</b-form-group>
				<b-form-group label="Postcode">
					<b-form-input v-model="form.postcode"></b-form-input>
				</b-form-group>
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
				interest: 'ReliefCenter',
				street: '',
				unitNo: '',
				postcode: '',
				name: ''
			},
			status: 'ready'
		}
	},
	methods: {
		onSubmit: function (evt) {
			evt.preventDefault()
			window.alert(JSON.stringify(this.form))
			this.$router.push('/search')
		}
	}
}
</script>

<style>
</style>
