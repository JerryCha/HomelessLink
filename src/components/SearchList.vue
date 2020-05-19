<template>
  <div>
		<!-- Filter -->
		<div id="filter-panel" style="display: flex; align-items: center; justify-content: space-between;">
			<!-- Type filter button -->
			<b-button variant="light" @click="$bvToast.show('filter-panel')">Filter</b-button>
			<!-- Results count -->
			<div>
          <span :class="{'invisible': resultsCount === -1}">Found {{resultsCount}} results</span>
      </div>
		</div>
		<!-- Filter panel-->
		<b-toast id="filter-panel" title="Type Select" static no-auto-hide solid>
			<TypeFilter :options="filterOptionsList"/>
		</b-toast>
		<div id="content-block">
			<!-- Searching indication block -->
			<div :class="isSearching()?'':'invisible'">
				<p class="searching-text">Searching</p>
			</div>
			<!-- No result block -->
			<div :class="hasNoResult()?'':'invisible'">
				<p class="searching-text">No Result</p>
			</div>
			<!-- Result block -->
			<div :class="isSearching()||hasNoResult()?'invisible':''" id="result-list">
				<PoiCard v-for="poi in results"
									:class="['result-card', shouldHover(poi.id) ? 'result-card-hover': '']"
									:id = "'result-' + poi.id"
									:key="poi.id"
									:locId="poi.id"
									:type="getType(poi.type)"
									:name="poi.name"
									:suburb="poi.suburb"
									:website="poi.website"
				/>
			</div>
		</div>
		<!-- back to previous page button -->
    <!-- <b-button @click="goBack" id="back-button" block variant="outline-dark">Back</b-button> -->
  </div>
</template>

<script>
import PoiCard from '@/components/PoiCard.vue'
import TypeFilter from '@/components/TypeSelectPanel.vue'

export default {
	name: 'search-list',
	components: {
		PoiCard,
		TypeFilter
	},
	data () {
		return {
			// filterOptions is dynamically loaded from backend
			filterOptionsList: []
		}
	},
	methods: {
		/** Go back to previous page.
			* Not in use
		*/
		goBack: function () {
			// clear result repository
			this.$store.dispatch('locations/flushResultsList')
			// Go back
			this.$router.go(-1)
		},
		/**
		 * Is searching indicator.
		 * Return true when result count is -1.
		 */
		isSearching: function () {
			return this.$store.state.locations.resultsCount === -1
		},
		/**
		 * Not found result indicator.
		 * Return true when result count is 0.
		 */
		hasNoResult: function () {
			return this.$store.state.locations.resultsCount === 0
		},
		/**
		 * Card should hover indicator.
		 * Return true when the card id equals to the hovered marker id.
		 */
		shouldHover: function (id) {
			return this.onHoverLocationId === id
		},
		/**
		 * Parse type id from given type api address.
		 */
		getType: function (rawId) {
			if (rawId === undefined || rawId === null) {
				throw new Error('rawId is undefined or null')
			}
			var temp = rawId.split('/')
			if (!Array.isArray(temp) || temp.length === 1) {
				return -1
			}
			var id = Number(temp[temp.length - 2])
			return this.allTypes.filter(t => t.value === id)[0]
		}
	},
	mounted () {
		this.filterOptionsList = this.allTypes
	},
	watch: {
		/**
		 * Watching hovered marker, scrolling the result list
		 * to the position of corresponding card.
		 */
		onHoverLocationId (newVal, oldVal) {
			// -1 means no marker being hovered
			if (newVal !== -1) {
				document.getElementById('result-' + newVal).scrollIntoView()
			}
		}
	},
	computed: {
		/**
		 * Reference of result of locations in vuex
		 */
		results: function () {
			return this.$store.state.locations.resultsList
		},
		/**
		 * Reference of result of locations count in vuex
		 */
		resultsCount: function () {
			return this.$store.state.locations.resultsCount
		},
		/**
		 * Reference of id of location marker being hovered in vuex
		 */
		onHoverLocationId: function () {
			return this.$store.state.locations.onHoverLocationId
		},
		/**
		 * Reference of all types under a topic
		 */
		allTypes: function () {
			return this.$store.state.locations.allTypes
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
#content-block {
  height: calc(100% - 38px);
  overflow-y: scroll;
	margin-top: 0.5rem;
}
#result-list {
	max-height: 100%;
}
.result-card {
  margin: 0.5em 0.2em;
	/* x offset | y offset | blur radius | spread radius | color */
	box-shadow: 0px 0px 0px 0px rgba(255,255,255,0);
	transition: box-shadow .3s;
}
.result-card-hover, .result-card:hover {
	z-index: 0;
	box-shadow: 4px 4px 8px 0px rgba(128,128,128,.5);
}
.invisible {
	display: none;
}
.searching-text {
	font-size: 2em;
}
.b-toast {
	position: absolute;
}
</style>
