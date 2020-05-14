<template>
  <b-container id="swiper-wrap" class="" fluid>
    <swiper class="swiper fullscreen-wrap" ref="mySwiper" :options="swiperOptions">
      <!-- Top slide -->
			<swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align"
              id="top-section"
              :style="topSlide">
          <div class="slide-content">
            <b-container>
              <b-row>
                <!-- Left half (desktop)/Upper half (mobile) -->
                <b-col xs="12" sm="6">
                  <!-- <img src="@/assets/portrait.png"> -->
                </b-col>
                <!-- Right half (desktop)/Lower half (mobile) -->
                <b-col xs="12" sm="6" class="light-color">
                  <h1>Welcome to MatesHelp</h1>
                  <p>Our websites records hundreds of supporting center within Victoria.
                    Anyone who is experiencing homeless can search these location surround themselves.
                  </p>
                  <div class="flex-wrap flex-center-align">
                    <b-button class="flex-wrap-item clear-style icon-button">
                      <img :src="require('@/assets/top_helphls_button.png')">
                      <p>Help Homeless</p>
                    </b-button>
                    <b-button class="flex-wrap-item clear-style icon-button">
                      <img :src="require('@/assets/top_seekhelp_button.png')">
                      <p>Seek of Help</p>
                    </b-button>
                    <b-button class="flex-wrap-item clear-style icon-button">
                      <img :src="require('@/assets/top_contact_button.png')">
                      <p>Contact us</p>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </div>
      </swiper-slide>
      <!-- Help Homeless slide -->
      <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align" id="help-homeless-section">
          <b-container>
            <b-row align-h="center">
              <h1>Help Homeless</h1>
            </b-row>
            <b-row align-h="center">
              <p>Here is the distribution of homelessness per suburb, by 2015.</p>
            </b-row>
            <b-row align-h="center">
              <img :src="require('@/assets/temmmppp.jpg')">
            </b-row>
            <b-row align-h="center">
              <b-button variant="outline-info" style="color:rgba(243,121,30,1);border-color:rgba(243,121,30,1)">Read more</b-button>
            </b-row>
          </b-container>
        </div>
      </swiper-slide>
      <!-- Seek of Help slide -->
      <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align" id="seek-help-section">
          <b-container fluid>
            <b-row align-h="center">
              <h1>Seek of Help</h1>
            </b-row>
            <b-row align-h="center">
              <p>Select the options below that you need help with</p>
            </b-row>
            <b-row align-h="center">
              <div class="flex-wrap">
                <TopicTile class="mx-3" :title="'Essential Services'" :iconImage="'seekhelp_essential_icon'" :tileBackground="'seekhelp_essential_bg_vertical.jpg'"/>
                <TopicTile class="mx-3" :title="'Get On Your Feet'" :iconImage="'seekhelp_feet_icon'" :tileBackground="'seekhelp_feet_bg_vertical.jpg'"/>
                <TopicTile class="mx-3" :title="'Get Healthy'" :iconImage="'seekhelp_health_icon'" :tileBackground="'seekhelp_health_bg_vertical.jpg'"/>
                <TopicTile class="mx-3" :title="'Help from Addiction'" :iconImage="'seekhelp_addiction_icon'" :tileBackground="'seekhelp_addiction_bg_vertical.jpg'"/>
                <TopicTile class="mx-3" :title="'Comminity Services'" :iconImage="'seekhelp_community_icon'" :tileBackground="'seekhelp_community_bg_vertical.jpg'"/>
              </div>
            </b-row>
          </b-container>
        </div>
      </swiper-slide>
      <!-- Contact us -->
      <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align color-block-2" id="contact-section">
          <b-container>
            <h1>CONTACT US</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates, eum molestiae!
              Quibusdam tempore sunt labore rem porro doloribus esse quae
              accusamus eveniet ex ab ducimus dolorum inventore, placeat consequuntur
              fugiat.</p>
          </b-container>
        </div>
      </swiper-slide>
		</swiper>
  </b-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import TopicTile from '@/components/TopicTile'

export default {
	name: 'homepage-v2',
	components: {
		Swiper,
		SwiperSlide,
		TopicTile
	},
	data () {
		return {
			swiperOptions: {
				mousewheel: true,
				direction: 'vertical',
				slidesPerView: 1,
				spaceBetween: 0,
				overflow: 'auto'
			},
			topSlide: {
			}
		}
	},
	mounted () {
		this.swiper.on('slideChange', this.toggleNavbarStyle)
		this.navbar.setToOrangeMode()
	},
	computed: {
		swiper () {
			return this.$refs.mySwiper.$swiper
		},
		navbar () {
			return this.$store.state.locations.navbar
		}
	},
	methods: {
		toggleNavbarStyle: function () {
			var navbar = this.navbar
			var realIndex = this.swiper.realIndex
			if (realIndex === 0 || realIndex === 3) {
				// Change navbar to orange
				navbar.setToOrangeMode()
			} else {
				// Change navbar to light
				navbar.setToLightMode()
			}
		}
	}
}
</script>

<style>
.color-block-1 {
  background-color: #66ccff;
}
.color-block-2 {
  background-color: #f5781c;
}
.clear-style {
  color: unset;
  background: unset;
  border: unset;
}
.icon-button {
  background: transparent;
  color: white;
}
.icon-button:hover {
  background: white;
  color: black;
}
.flex-wrap {
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: -moz-flex;
}
.flex-wrap > .flex-wrap-item {
  margin-right: 1rem;
}
.flex-wrap > .flex-wrap-item:last-child {
  margin-right: 0px;
}
.flex-center-align {
  justify-content: center;
  align-items: center;
}
#swiper-wrap {
  padding: 0 0;
  position: absolute;
  top: 0;
  left: 0;
}
.slide-wrap {
  height: 100%;
  width: 100%;
}
.fullscreen-wrap {
  height: 100vh;
}
.light-color {
  color: white;
}
#top-section {
  background-image: url('~@/assets/top_slide_bg.png');
}
#help-homeless-section {
  background: rgba(245,246,249,1);
}
#seek-help-section {
  background: rgba(252,252,252,1);
}
</style>
