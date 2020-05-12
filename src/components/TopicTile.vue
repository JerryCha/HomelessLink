<template>
  <div class="topic-tile flex-wrap flex-orientation-column topic-tile-center-align">
    <img src="@/assets/tile-temp-icon.jpg" style="width: 80px;">
    <h2>Tile Title</h2>
  </div>
</template>

<script>
export default {
	name: 'topic-tile',
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style scope>
.topic-tile {
  height: 40vh;
  width: 15vw;
  box-sizing: border-box;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 70%), #00ff00;  /* Experiment purpose */
  border-radius: 1rem;
  /* x offset | y offset | blur radius | spread radius | color */
  box-shadow: 0px 0px 16px 0px rgba(180, 180, 180, 0.25);
  /* TODO: Add transition */
  transition: box-shadow 0.25s, background 0.25s;
  padding-top: 1rem;
}
.topic-tile:hover {
  background: linear-gradient(to bottom, rgba(243, 121, 30, 1) 30%, rgba(243, 121, 30, 0) 70%), #ff0000;  /* Experiment purpose */
  box-shadow: 0px 0px 0px 0px rgba(255,255,255,1);
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
}
</style>
