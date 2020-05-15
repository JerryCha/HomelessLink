import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import SearchList from '@/components/SearchList.vue'
import Detail from '@/views/Detail.vue'
// import Homepage from '@/views/HomePage.vue'
import Homepage from '@/views/Homepage.v2.vue'

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
		path: '/itr2',
		name: 'homepage',
		component: Homepage
	},
	{
		path: '/itr2/:problem',
		name: 'problem-home',
		component: () => import('./views/ProblemHome.vue')
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	},
	{
		path: '/newhome',
		name: 'new-home',
		component: Homepage
	}
]

const router = new VueRouter({
	routes
})

export default router
