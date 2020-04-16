<template>
  <div>
    <div id="result-list">
      <PoiCard class="result-card" v-for="(poi, idx) in result"
                :key="idx"
                :name="poi.name"
                :desc="poi.desc"
                :street="poi.street"
                :suburb="poi.suburb"
                :postcode="poi.postcode"
                :email="poi.email"
                :phone="poi.phone"
      />
    </div>
    <b-button id="back-button" block variant="outline-dark">Back</b-button>
  </div>
</template>

<script>
import PoiCard from '@/components/PoiCard.vue'
export default {
	name: 'search-list',
	components: {
		PoiCard
	},
	data () {
		return {
			result: [
				{
					name: '11111',
					desc: '111111111111111111111111111111111111111111111111',
					street: '233 Funny road',
					suburb: 'Melbourne',
					postcode: 'VIC3000',
					email: 'mail@example.com',
					phone: '+61233334444'
				},
				{
					name: '22222',
					desc: '222222222222222222222222222222222222222222222222',
					street: '233 Funny road',
					suburb: 'Melbourne',
					postcode: 'VIC3000',
					email: 'mail@example.com',
					phone: '+61233334444'
				},
				{
					name: '22222',
					desc: '222222222222222222222222222222222222222222222222',
					street: '233 Funny road',
					suburb: 'Melbourne',
					postcode: 'VIC3000',
					email: 'mail@example.com',
					phone: '+61233334444'
				},
				{
					name: '22222',
					desc: '222222222222222222222222222222222222222222222222',
					street: '233 Funny road',
					suburb: 'Melbourne',
					postcode: 'VIC3000',
					email: 'mail@example.com',
					phone: '+61233334444'
				},
				{
					name: '22222',
					desc: '222222222222222222222222222222222222222222222222',
					street: '233 Funny road',
					suburb: 'Melbourne',
					postcode: 'VIC3000',
					email: 'mail@example.com',
					phone: '+61233334444'
				}
			]
		}
	}
}
</script>

<style scoped>
#back-button {
  position: relative;
  bottom: 0px;
  margin: 0.5em auto;
}
#result-list {
  max-height: 75vh;
  overflow-y: auto;
}
.result-card {
  margin: 0.5em auto;
}
</style>
