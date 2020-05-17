<template>
  <div @click="clickHandler">
    <!-- Mobile style (horizontal) -->
    <div v-if="mobile" class="topic-tile topic-tile-horizontal" @mouseenter="mouseenterHanlder" @mouseleave="mouseleaveHandler"
      :style="{
        background: this.tileBackground === '' ?
                        '' : 'url' + '(' + require('@/assets/' + this.tileBackground + '_horizontal.jpg') + ')' + ' no-repeat center/cover'
      }"
    >
      <div class="content-wrap content-wrap-horizontal flex-wrap topic-tile-center-align">
        <!-- Hovering status -->
        <img v-if="pointerEnter" :src="require('@/assets/' + iconImage + '.png')"
            :srcset="`${require('@/assets/' + iconImage + '_hover.png')}, ${require('@/assets/' + iconImage + '_hover@2x.png')} 2x`"
            style="width: 36px;">
        <!-- Common stauts -->
        <img v-else :src="require('@/assets/' + iconImage + '.png')"
            :srcset="`${require('@/assets/' + iconImage + '.png')}, ${require('@/assets/' + iconImage + '@2x.png')} 2x`"
            style="width: 36px;">
        <h5 class="topic-tile-title">{{ title }}</h5>
      </div>
    </div>
    <!-- Vertical -->
    <div v-else class="topic-tile" @mouseenter="mouseenterHanlder" @mouseleave="mouseleaveHandler"
      :style="{
        background: this.tileBackground === '' ?
                        '' : 'url' + '(' + require('@/assets/' + this.tileBackground + '_vertical.jpg') + ')' + ' no-repeat center/cover'
      }"
    >
      <div class="content-wrap flex-wrap flex-orientation-column topic-tile-center-align">
        <!-- Hovering status -->
        <img v-if="pointerEnter" :src="require('@/assets/' + iconImage + '.png')"
            :srcset="`${require('@/assets/' + iconImage + '_hover.png')}, ${require('@/assets/' + iconImage + '_hover@2x.png')} 2x`"
            style="width: 48px;">
        <!-- Common stauts -->
        <img v-else :src="require('@/assets/' + iconImage + '.png')"
            :srcset="`${require('@/assets/' + iconImage + '.png')}, ${require('@/assets/' + iconImage + '@2x.png')} 2x`"
            style="width: 48px;">
        <h5 class="topic-tile-title">{{ title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'topic-tile',
	props: {
		iconImage: {
			type: String,
			default: ''
		},
		tileBackground: {
			type: String,
			default: ''
		},
		title: {
			type: String
    },
    slug: {
      type: String
    }
	},
	data () {
		return {
			wrapWidth: 1024,
			wrapHeight: 576,
			pointerEnter: false
		}
	},
	mounted () {
		this.wrapWidth = this.$parent.$el.clientWidth
		this.wrapHeight = this.$parent.$el.clientHeight
		window.addEventListener('resize', () => {
			this.wrapWidth = this.$parent.$el.clientWidth
			this.wrapHeight = this.$parent.$el.clientHeight
		})
	},
	computed: {
		iconPath: function () {
			return '@/assets/' + this.iconImage + '.png'
		},
		iconPath2x: function () {
			return '@/assets/' + this.iconImage + '@2x.png'
		},
		mobile: function () {
			return this.wrapWidth < this.wrapHeight
		}
	},
	methods: {
		mouseenterHanlder: function () {
			this.pointerEnter = true
		},
		mouseleaveHandler: function () {
			this.pointerEnter = false
		},
		clickHandler: function () {
			this.$router.push('/seek-help/' + this.slug)
		}
	}
}
</script>

<style scope>
.topic-tile {
  height: 40vh;
  width: 15vw;
  box-sizing: border-box;
  border-radius: 1rem;
  /* x offset | y offset | blur radius | spread radius | color */
  box-shadow: 0px 0px 16px 0px rgba(180, 180, 180, 0.25);
  /* TODO: Add transition */
  transition: box-shadow 0.25s;
}
.topic-tile > * {
  margin-bottom: 2rem;
}
.topic-tile:hover {
  box-shadow: 0px 0px 0px 0px rgba(255,255,255,1);
}
.topic-tile-horizontal {
  height: 11vh;
  width: 90vw;
}
.topic-tile-horizontal > * {
  margin-right: 2rem;
}
.content-wrap {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  padding-top: 1rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 0) 60%);
  transition: background 0.5s;
}
.content-wrap-horizontal {
  padding-left: 1rem;
  padding-top: 0rem;
  /* background: linear-gradient(to right, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 0) 60%);; */
  background:rgba(250, 250, 250, .65);
}
.topic-tile-title {
  color:rgba(243, 121, 30, 1);
}
.content-wrap:hover {
  background: linear-gradient(to bottom, rgba(243, 121, 30, 1) 40%,  rgba(243, 121, 30, .5) 50%,  rgba(243, 121, 30, 0) 60%);
  cursor: pointer;
}
.content-wrap-horizontal:hover {
  /* background: linear-gradient(to right, rgba(243, 121, 30, 1) 40%,  rgba(243, 121, 30, .5) 50%,  rgba(243, 121, 30, 0) 60%); */
  background:rgba(243, 121, 30, .75);
  cursor: pointer;
}
.content-wrap:hover .topic-tile-title {
  color: white;
}
.flex-wrap {
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: -moz-flex;
}
.flex-orientation-column {
  flex-direction: column;
}
.topic-tile-center-align {
  align-items: center;
  /* justify-content: space-between; */
}
</style>
