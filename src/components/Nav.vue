<template>
  <div id="navbar-wrap" :class="[navbar.themeStyle, 'background-transition']">
    <b-navbar toggleable="lg" :type="navbar.navTextColor">
      <b-navbar-brand :to="'/'">
				<!-- White Logo -->
        <img v-if="navbar.themeStatus==='transparent'||navbar.themeStatus==='orange'"
              src="@/assets/logo_white@2x.png"
              srcset="@/assets/logo_white@1x.png,
                      @/assets/logo_white@2x.png 2x"
        >
				<!-- Black logo -->
        <img v-else
              src="@/assets/logo_dark@2x.png"
              srcset="@/assets/logo_dark.png,
                      @/assets/logo_dark@2x.png 2x"
        >
      </b-navbar-brand>
			<!-- Toggle button -->
      <b-navbar-toggle target="nav-menu-collapse"></b-navbar-toggle>
			<!-- Navigation -->
      <b-collapse ref="toggle-nav" id="nav-menu-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
					<!-- Home -->
          <b-nav-item :to="'/'">Home</b-nav-item>
					<!-- Seek of help (Containing secondary navigation) -->
          <b-nav-item-dropdown text="Seek Help">
            <b-dropdown-item :to="'/seek-help/essential'">Essential Services</b-dropdown-item>
            <b-dropdown-item :to="'/seek-help/eldercare'">Elder Care</b-dropdown-item>
            <b-dropdown-item :to="'/seek-help/healthy'">Get healthy</b-dropdown-item>
            <b-dropdown-item :to="'/seek-help/addiction'">Help from addiction</b-dropdown-item>
            <b-dropdown-item :to="'/seek-help/community'">Community Services</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import API from '@/api/api'

export default {
	components: {
	},
	data () {
		return {
			navbar: {
				themeStatus: 'light',
				themeStyle: 'mateshelp-light',
				navTextColor: 'light'
			},
			seekOfHelp: []	// {id: '', displayName: '', urlName: ''}
		}
	},
	created () {
		// Fetch secondary pages' information.
		axios.get(API.PAGE.PAGE_API())
			.then(res => {
				this.$store.dispatch('pages/setPageList', res.data)
				this.seekOfHelp = res.data.map(e => {
					return {
						id: e.id,
						displayName: e.name,
						urlName: e.slug
					}
				})
				// this.$store.dispatch('pages/setNavPageList', this.seekOfHelp)
			})
	},
	mounted () {
	},
	methods: {
		setToTransparentMode () {
			this.navbar.themeStatus = 'transparent'
			this.navbar.themeStyle = 'mateshelp-transparent'
			this.navbar.navTextColor = 'dark'
		},
		setToLightMode () {
			this.navbar.themeStatus = 'light'
			this.navbar.themeStyle = 'mateshelp-light'
			this.navbar.navTextColor = 'light'
		},
		setToOrangeMode () {
			this.navbar.themeStatus = 'orange'
			this.navbar.themeStyle = 'mateshelp-orange'
			this.navbar.navTextColor = 'dark'
		}
	},
	computed: {
	}
}
</script>

<style>
#navbar-wrap {
  padding: 2vh 2vw 0vh 2vw;
  position: sticky;
  top: 0;
  /* width: 100vw; */
  z-index: 99999;
  box-sizing: border-box;
  font-size: 1.15rem;
}
.background-transition {
	transition: background-color 0.25s;
}
.mateshelp-light {
  background-color: rgba(255,255,255,1);
  box-shadow: 0px 8px 8px 0px rgba(192, 192, 192, 0.5);
}
.mateshelp-orange {
  background-color: rgba(243,121,30,1);
}
</style>
