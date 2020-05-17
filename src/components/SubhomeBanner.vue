<template>
  <div id="banner" v-bind:style="{ backgroundImage: 'url(' + bgImg + ')' }">
		<h1>{{ title }}</h1>
		<h2>{{ subtitle }}</h2>
		<!-- <b-img :src="bgImg"></b-img> -->
  </div>
</template>

<script>
export default {
	name: 'subhome-banner',
	props: {
		title: String,
		subtitle: {
			type: String,
			defualt: ''
		},
		bgImg: {
			type: String,
			default: ''
		},
		height: {
			type: String,
			defult: '300px'
		}
	},
	data () {
		return {
		}
	}
}
</script>

<style>
#banner {
	/* positioning */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	/* dimention */
	height: 300px;
	width: 100%;
	/* style */
	color: white;
	background-repeat: no-repeat;
	background-size: cover;
	box-sizing: border-box;
	border-radius: 16px;
}
</style>
