import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import SearchList from '@/components/SearchList.vue'
import SearchForm from '@/components/SearchForm.vue'
import Detail from '@/views/Detail.vue'
import Homepage from '@/views/HomePage.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Homepage
	},
	{
		path: '/itr1',
		component: Home,
		children: [
			{
				path: '',
				component: SearchForm
			},
			{
				path: 'search',
				component: SearchList
			},
			{
				path: 'detail/:id',
				component: Detail,
				props: true
			}
		]
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
