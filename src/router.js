import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchList from '@/components/SearchList.vue'
import Detail from '@/views/Detail.vue'
import Homepage from '@/views/Homepage.v2.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Homepage
	},
	{
		path: '/seek-help/:problem',
		name: 'problem-home',
		props: true,
		component: () => import('./views/ProblemHome.vue'),
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
	}
]

const router = new VueRouter({
	routes
})

export default router
