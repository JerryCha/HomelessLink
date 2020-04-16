<template>
  <div class="about">
    <h1>Homeless Link Test Page</h1>
    <div>
      <SearchList />
    </div>
  </div>
</template>

<script>
import SearchList from '@/components/SearchList.vue'
export default {
	name: 'about',
	components: {
		SearchList
	}
}
</script>
