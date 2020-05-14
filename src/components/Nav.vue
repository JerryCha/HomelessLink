<template>
  <div id="navbar-wrap" :class="[navbar.themeStyle, 'background-transition']">
    <b-navbar toggleable="lg" :type="navbar.navTextColor">
      <b-navbar-brand :to="'/'">
        <img v-if="navbar.themeStatus==='transparent'||navbar.themeStatus==='orange'"
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
          <b-nav-item :to="'/'">Home</b-nav-item>
          <b-nav-item :to="'/'">Help Homeless</b-nav-item>
          <b-nav-item-dropdown text="Seek of Help">
            <b-dropdown-item :to="'/itr2/1'">Essential Services</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/2'">Elder Care</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/3'">Get healthy</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/4'">Help from addiction</b-dropdown-item>
            <b-dropdown-item :to="'/itr2/5'">Community Services</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="'/'">Contact us</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import logoWhite from '@/assets/logo_white.png'
import axios from 'axios'
import API from '@/api/api'

export default {
	components: {
	},
	data () {
		return {
			images: {
				'logoWhite': logoWhite
			},
			navbar: {
				themeStatus: 'light',
				themeStyle: 'mateshelp-light',
				navTextColor: 'light'
			},
			seekOfHelp: []	// {id: '', displayName: '', urlName: ''}
		}
	},
	created () {
		axios.get(API.PAGE.GET_PAGE_LIST())
			.then(res => {
				this.$store.dispatch('pages/setPageList', res.data)
				this.seekOfHelp = res.data.map(e => {
					return {
						id: e.id,
						displayName: e.name,
						urlName: e.slug
					}
				})
				window.console.log(`this.seekOfHelp: ${JSON.stringify(this.seekOfHelp)}`)
				this.$store.dispatch('pages/setNavPageList', this.seekOfHelp)
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
  box-shadow: 0px 8px 16px 0px rgba(180, 180, 180, 0.5);
}
.mateshelp-orange {
  background-color: rgba(243,121,30,1);
}
</style>
