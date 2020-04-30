<template>
  <div class="about">
    <h1>Homeless Link Test Page</h1>
    <div>
      <Detail :name="'11111'"
					:desc="'111111111111111111111111111111111111111111111111'"
					:street="'233 Funny road'"
					:suburb="'Melbourne'"
					:postcode="'VIC3000'"
					:email="'mail@example.com'"
					:phone="'+61233334444'"/>
    </div>
  </div>
</template>

<script>
import Detail from '@/views/Detail.vue'
export default {
	name: 'about',
	components: {
		Detail
	}
}
</script>
