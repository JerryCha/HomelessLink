<template>
  <div>
    <h1>{{sampleTxt}}</h1>
  </div>
</template>

<script>
export default {
	name: 'FirstComponent',
	props: {
		sampleTxt: String
	}
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
