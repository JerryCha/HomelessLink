<template>
  <div class="topic-tile"
    :style="{
      background: this.tileBackground === '' ?
                      '' : 'url' + '(' + require('@/assets/' + this.tileBackground) + ')' + ' no-repeat center/cover'
    }"
  >
    <div class="content-wrap flex-wrap flex-orientation-column topic-tile-center-align">
      <img :src="require('@/assets/' + iconImage + '.png')"
          :srcset="`${require('@/assets/' + iconImage + '.png')}, ${require('@/assets/' + iconImage + '@2x.png')} 2x`"
          style="width: 48px;">
      <h5 class="topic-tile-title">{{ title }}</h5>
    </div>
  </div>
</template>

<script>
export default {
	name: 'topic-tile',
	props: {
		mobile: {
			type: Boolean,
			default: false
		},
		iconImage: {
			type: String,
			default: ''
		},
		tileBackground: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconPath: function () {
			return '@/assets/' + this.iconImage + '.png'
		},
		iconPath2x: function () {
			return '@/assets/' + this.iconImage + '@2x.png'
		}
	},
	methods: {
		gotoTopicPage: function () {
			// TODO: implement go to topic page.
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
.content-wrap {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem;
  padding-top: 1rem;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, .5) 50%, rgba(255, 255, 255, 0) 60%);
  transition: background 0.5s;
}
.topic-tile-title {
  color:rgba(243, 121, 30, 1);
}
.content-wrap:hover {
  background: linear-gradient(to bottom, rgba(243, 121, 30, 1) 40%,  rgba(243, 121, 30, .5) 50%,  rgba(243, 121, 30, 0) 60%);
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
