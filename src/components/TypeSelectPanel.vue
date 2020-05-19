<template>
  <div id="filter-panel">
    <b-form-group>
      <template v-slot:label>
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          @change="toggleAll"
        >
          {{ allSelected ? 'Un-select All' : 'Select All' }}
        </b-form-checkbox>
      </template>
      <b-form-checkbox-group
          v-model="selected"
          :options="options"
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
	name: 'type-select-panel',
	data () {
		return {
			selected: [],	// selected options array containing option id
			allSelected: true,	// all selected indicator
			indeterminate: false	// particially selected indicator
		}
	},
	mounted () {
		this.selected = this.$store.state.locations.filterTypes
	},
	methods: {
		toggleAll (checked) {
			this.selected = checked ? this.options.map(item => item.value) : []
		}
	},
	computed: {
		options: function () {
			var optionsCode = this.$store.state.locations.resultsType
			return this.$store.state.locations.allTypes.filter(t => optionsCode.includes((t.value)))
		}
	},
	watch: {
		selected (newVal, oldVal) {
			if (newVal.length === 0) {
				// No options selected
				this.indeterminate = false
				this.allSelected = false
				// Update new selected options to vuex, afterwards updating the results to show
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						// None selected, result to show is null
						this.$store.dispatch('locations/filterResultsList')
					}).catch((reason) => { window.console.error(reason) })
			} else if (newVal.length === this.options.length) {
				// all options selected
				this.allSelected = true
				this.indeterminate = false
				// Update new selected options to vuex, afterwards updating the results to show
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						this.$store.dispatch('locations/resumeResultsList')
					})
					.catch((reason) => { window.console.error(reason) })
			} else {
				// particial options selected
				this.indeterminate = true
				this.allSelected = false
				// Update new selected options to vuex, afterwards updating the results to show
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						this.$store.dispatch('locations/filterResultsList')
					})
					.catch((reason) => { window.console.error(reason) })
			}
		}
	}
}
</script>

<style scoped>
</style>
