<template>
  <div id="navbar-wrap" :class="themeStyle">
    <b-navbar toggleable="lg" :type="navTextColor">
      <b-navbar-brand :to="'/'">
        <img v-if="themeStatus==='transparent'||themeStatus==='orange'"
              src="@/assets/logo_white@2x.png"
              srcset="@/assets/logo_white@1x.png,
                      @/assets/logo_white@2x.png 2x"
        >
        <img v-else
              src="@/assets/logo_dark@2x.png"
              srcset="@/assets/logo_dark.png,
                      @/assets/logo_dark@2x.png 2x"
        >
      </b-navbar-brand>
      <b-navbar-toggle target="nav-menu-collapse"></b-navbar-toggle>
      <b-collapse ref="toggle-nav" id="nav-menu-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="'/'">Welcome to MatesHelp</b-nav-item>
          <b-nav-item :to="'/'">Help Homeless</b-nav-item>
          <b-nav-item-dropdown text="Seek of Help">
            <b-dropdown-item :to="'/itr2/essential'">Essential Services</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/on-your-feet'">Get on your feet</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/healthy'">Get healthy</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/addiction'">Help from addiction</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/community'">Community Services</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="'/'">Contact us</b-nav-item>
          <b-nav-item :to="'/newhome'">New homepage</b-nav-item>
          <!-- <b-nav-item :to="'/about'">Acknowledgement</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logoWhite from '@/assets/logo_white.png'
export default {
	components: {
	},
	data () {
		return {
			images: {
				'logoWhite': logoWhite
			},
			themeStatus: 'light',
			themeStyle: 'mateshelp-light',
			navTextColor: 'dark'
		}
	},
	mounted () {
	},
	methods: {
		setToTransparentMode () {
			this.themeStatus = 'transparent'
			this.themeStyle = 'mateshelp-transparent'
			this.navTextColor = 'dark'
		},
		setToLightMode () {
			this.themeStatus = 'light'
			this.themeStyle = 'mateshelp-light'
			this.navTextColor = 'light'
		},
		setToOrangeMode () {
			this.themeStatus = 'orange'
			this.themeStyle = 'mateshelp-orange'
			this.navTextColor = 'dark'
		}
	},
	computed: {
		navToggled () {
			return this.$refs['toggle-nav'].show
		},
		themeClass () {
			switch (this.themeStyle) {
			case 'light':
				return { colorClass: 'mateshelp-light', fontColor: 'light' }
			case 'orange':
				if (this.navToggled === true) {
					return { colorClass: 'mateshelp-orange', fontColor: 'dark' }
				} else {
					return { colorClass: 'mateshelp-transparent', fontColor: 'dark' }
				}
			case 'transparent':
				return { colorClass: 'mateshelp-transparent', fontColor: 'dark' }
			}
		}
	}
}
</script>

<style>
#navbar-wrap {
  padding: 2vh 2vw 0vh 2vw;
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: 99999;
  box-sizing: border-box;
  /* background-color: rgba(237,121,28,0.2); */
  font-size: 1.15rem;
}
.mateshelp-light {
  background-color: rgba(255,255,255,1);
  box-shadow: 0px 8px 16px 0px rgba(180, 180, 180, 0.5);
}
.mateshelp-light * {
  color: black;
}
.mateshelp-orange {
  background-color: rgba(243,121,30,1);
}
.mateshelp-transparent {
  /* background-color: rgba(0,0,0,0); */
}
</style>
