<template>
<!-- Display format:
	Location Name
	Location Type
	Suburb
	Website
-->
  <b-card
    :title="name">
    <b-card-text>
			<!-- Location Type -->
			<p><strong>{{ typeName }}</strong></p>
			<!-- Suburb -->
      <p>Suburb: {{ suburb }}</p>
			<!-- Website link -->
      <p :class="hasNoLink(website)?'is-invisible':''">Website: <a :href="website" target="_blank">{{ website }}</a></p>
			<!-- Detail button -->
			<router-link :to="detailLink">Detail</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
	name: 'poi-card',
	props: {
		locId: Number,	// Location ID
		type: Object,	// Type object. Expected format: { text: String, value: Number }
		name: String,
		suburb: String,
		website: String
	},
	computed: {
		// Return link to detail view, in format of and relative from current page to `:problem-name/detail/:locationID`
		detailLink: function () {
			return this.$route.params['problem'] + '/detail/' + String(this.locId)
		},
		// Computed type name, avoiding reading undefined of type Object.
		typeName: function () {
			return typeof this.type === 'undefined' ? '' : this.type.text
		}
	},
	methods: {
		// Link to website visibility control. If a location does not have a website link, the link will not be shown.
		hasNoLink: function (url) {
			return url === null
		}
	}
}
</script>

<style scoped>
.is-invisible {
	display: none;
}
</style>
