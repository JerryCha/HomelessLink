<template>
  <b-card
    :title="name">
    <b-card-text>
      <p>Suburb: {{ suburb }}</p>
      <p :class="hasNoLink(website)?'is-invisible':''">Website: <a :href="website">{{ website }}</a></p>
			<router-link :to="detailLink">Detail</router-link>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
	name: 'poi-card',
	props: {
		id: String,
		name: String,
		suburb: String,
		website: String
	},
	computed: {
		detailLink: function () {
			return '/itr1/detail/' + this.id
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
