import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Quiz from './components/Quiz.vue';
import Score from './components/Score.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/quiz',
			name: 'quiz',
			component: Quiz,
		},
		{
			path: '/score',
			name: 'score',
			component: Score,
		},
		{
			path: '/about',
			name: 'about',
			component: About,
		},
	],
});
