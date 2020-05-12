<template>
  <div class="placeholder" :style="styleObj"></div>
</template>

<script>
export default {
	name: 'placeholder',
	props: {
		boxWidth: {
			type: String,
			default: '100%'
		},
		boxHeight: {
			type: String,
			default: '100%'
		}
	},
	data () {
		return {
			styleObj: {
				'width': this.boxWidth,
				'height': this.boxHeight,
				'box-sizing': 'border-box',
				'background-color': '#66ccff'
			}
		}
	}
}
</script>

<style>
</style>
