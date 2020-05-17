<template>
  <div id="swiper-wrap" class="">
    <swiper class="swiper fullscreen-wrap" ref="mySwiper" :options="swiperOptions">
      <!-- Top slide -->
			<swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align"
              id="top-section"
        >
          <div class="slide-content">
            <b-container>
              <b-row>
                <!-- Left half (desktop)/Upper half (mobile) -->
                <b-col sm="0" md="6" :class="{'invisible': portraitShouldHidden}">
                  <b-img :src="require('@/assets/top_portrait.png')" height="10vh" fluid></b-img>
                </b-col>
                <!-- Right half (desktop)/Lower half (mobile) -->
                <b-col sm="12" md="6" class="light-color">
                  <h1>Welcome to MatesHelp</h1>
                  <p>Our websites records hundreds of supporting center within Victoria.
                    Anyone who is experiencing homeless can search these location surround themselves.
                  </p>
                  <div class="flex-wrap flex-center-align">
                    <!-- <button @click="gotoSlide(1)" class="flex-wrap-item icon-button">
                      <img :src="require('@/assets/top_helphls_button.png')" width="64px">
                      <p>Help Homeless</p> -->
                    <!-- </button> -->
                    <button @click="gotoSlide(1)" class="flex-wrap-item icon-button">
                      <img :src="require('@/assets/top_seekhelp_button.png')" width="64px">
                      <p>Seek Help</p>
                    </button>
                    <button @click="gotoSlide(2)" class="flex-wrap-item icon-button">
                      <img :src="require('@/assets/top_contact_button.png')" width="64px">
                      <p>About us</p>
                    </button>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </div>
      </swiper-slide>
      <!-- Help Homeless slide -->
      <!-- <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align" id="help-homeless-section">
          <b-container>
            <b-row align-h="center">
              <h1>Help Homeless</h1>
            </b-row>
            <b-row align-h="center">
              <p>Here is the distribution of homelessness per suburb, by 2015.</p>
            </b-row>
            <b-row align-h="center">
              <img :src="require('@/assets/temmmppp.jpg')" fluid>
            </b-row>
            <b-row align-h="center">
              <b-button id="read-more-btn" variant="outline-info">Read more</b-button>
            </b-row>
          </b-container>
        </div>
      </swiper-slide> -->
      <!-- Seek of Help slide -->
      <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align" id="seek-help-section">
          <b-container fluid>
            <b-row align-h="center">
              <h1>Seek Help</h1>
            </b-row>
            <b-row align-h="center">
              <p>Select the options below that you need help with</p>
            </b-row>
            <b-row align-h="center">
              <div class="flex-wrap" style="justify-content:center;" id="tiles-container">
                <TopicTile class="mx-3 my-1" :slug="'essential'" :title="'Essential Services'" :iconImage="'seekhelp_essential_icon'" :tileBackground="'seekhelp_essential_bg'"/>
                <TopicTile class="mx-3 my-1" :slug="'eldercare'" :title="'Elder Care'" :iconImage="'seekhelp_feet_icon'" :tileBackground="'seekhelp_feet_bg'"/>
                <TopicTile class="mx-3 my-1" :slug="'healthy'" :title="'Get Healthy'" :iconImage="'seekhelp_health_icon'" :tileBackground="'seekhelp_health_bg'"/>
                <TopicTile class="mx-3 my-1" :slug="'addiction'" :title="'Help from Addiction'" :iconImage="'seekhelp_addiction_icon'" :tileBackground="'seekhelp_addiction_bg'"/>
                <TopicTile class="mx-3 my-1" :slug="'community'" :title="'Comminity Services'" :iconImage="'seekhelp_community_icon'" :tileBackground="'seekhelp_community_bg'"/>
              </div>
            </b-row>
          </b-container>
        </div>
      </swiper-slide>
      <!-- Contact us -->
      <swiper-slide>
        <div class="slide-wrap flex-wrap flex-center-align" id="contact-section">
          <b-container>
            <h1>About Us</h1>
            <p>
              MatesHelp is a website that presents users with a map of services
              near their current location, including relief centres and other organizations.
               Many target audiences who are experiencing homelessness can get help
                by searching for information about a nearby relief centre, libraries
                 and other different types of organizations.
               </p><p>
                 Made By: Propetics B9
               </p>

          </b-container>
        </div>
      </swiper-slide>
		</swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import TopicTile from '@/components/TopicTile'

export default {
	name: 'homepage-v2',
	props: {
		mobile: {
			type: Boolean,
			default: false
		}
	},
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
				overflow: 'auto',
				sliderDrag: false,
				simulateTouch: false
			},
			pageSize: {
				width: 1024,
				height: 576
			}
		}
	},
	mounted () {
		this.swiper.on('slideChange', this.toggleNavbarStyle)
		setTimeout(() => this.navbar.setToOrangeMode(), 10)
		this.pageSize.width = window.innerWidth
		this.pageSize.height = window.innerHeight
		window.addEventListener('resize', () => {
			this.pageSize.width = window.innerWidth
			this.pageSize.height = window.innerHeight
		})
	},
	computed: {
		swiper () {
			return this.$refs.mySwiper.$swiper
		},
		navbar () {
			return this.$store.state.locations.navbar
		},
		portraitShouldHidden () {
			return this.pageSize.width < 575
		},
		tilesContainerWidth () {
			return this.getTilesConteinerWidth()
		}
	},
	watch: {
	},
	methods: {
		toggleNavbarStyle: function () {
			var navbar = this.navbar
			var realIndex = this.swiper.realIndex
			if (realIndex === 0 || realIndex === 2) {
				// Change navbar to orange
				navbar.setToOrangeMode()
			} else {
				// Change navbar to light
				navbar.setToLightMode()
			}
		},
		getTilesConteinerWidth: function () {
			var containerDom = document.getElementById('tiles-container')
			var containerWidth = window.getComputedStyle(containerDom).width
			return containerWidth
		},
		gotoSlide: function (n) {
			if (n < 0 || n > 2) {
				window.console.error('index cannot smaller than 0 or greater than 3')
			}
			this.swiper.slideTo(n)
		}
	}
}
</script>

<style>
.invisible {
  display: none;
}
.clear-style {
  color: unset;
  background: unset;
  border: unset;
}
.icon-button {
  padding: 1rem 0.5rem 1rem 0.5rem;
  background: transparent;
  color: white;
  border: 0 solid white;
  border-radius: 8px;
  transition: color 0.25s, background-color 0.25s;
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
  padding: 0px 0px;
  width: 100%;
  box-sizing: border-box;
  /* position: absolute;
  top: 0;
  left: 0; */
}
.slide-wrap {
  height: 100%;
  width: 100%;
  padding: 1rem 1rem;
}
.fullscreen-wrap {
  height: calc(100vh - 98.53px - 6px);
  width: 100%;
}
.light-color {
  color: white;
}
#top-section {
  background-image: url('~@/assets/top_bg.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
#help-homeless-section {
  background: rgba(245,246,249,1);
}
#seek-help-section {
  background: rgba(252,252,252,1);
}
#contact-section {
  background-color: rgba(243,121,30,1);
  color: white;
}
#read-more-btn {
  color:rgba(243,121,30,1);
  border-color:rgba(243,121,30,1);
}
#read-more-btn:hover {
  background: rgba(243,121,30,1);
  color: white;
}
</style>
