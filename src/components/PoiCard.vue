<template>
  <b-card
    :title="name">
    <b-card-text>
			<p><strong>{{ type.text }}</strong></p>
      <p>Suburb: {{ suburb }}</p>
      <p :class="hasNoLink(website)?'is-invisible':''">Website: <a :href="website" target="_blank">{{ website }}</a></p>
			<router-link :to="detailLink">Detail</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
	name: 'poi-card',
	props: {
		locId: Number,
		type: Object,
		name: String,
		suburb: String,
		website: String
	},
	computed: {
		detailLink: function () {
			return '/itr1/detail/' + String(this.locId)
		}
	},
	methods: {
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
