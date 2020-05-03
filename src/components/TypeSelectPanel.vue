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
			selected: [],
			allSelected: true,
			indeterminate: false
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
			var optionsCode = this.$store.state.locations.filterTypes
			return this.$store.state.locations.allTypes.filter(t => optionsCode.includes((t.value)))
		}
	},
	watch: {
		selected (newVal, oldVal) {
			if (newVal.length === 0) {
				this.indeterminate = false
				this.allSelected = false
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						this.$store.dispatch('locations/filterResultsList', null)
					}).catch((reason) => { window.console.error(reason) })
			} else if (newVal.length === this.options.length) {
				this.allSelected = true
				this.indeterminate = false
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						this.$store.dispatch('locations/resumeResultsList')
					}).catch((reason) => { window.console.error(reason) })
			} else {
				this.indeterminate = true
				this.allSelected = false
				this.$store.dispatch('locations/setFilterTypes', newVal)
					.then(() => {
						this.$store.dispatch('locations/filterResultsList', null)
					}).catch((reason) => { window.console.error(reason) })
			}
		}
	}
}
</script>

<style scoped>
</style>
