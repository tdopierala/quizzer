import Axios from 'axios';
import Lodash from 'lodash';

import Questions from '@/store/data/questions';

const getters = {
	allQuestions: (state) => state.questions,
	allCategories: (state) => state.categories,
	isActive: (state) => state.quiz.active,
	activeIndex: (state) => state.quiz.index,
};

const actions = {
	async getCategories({ commit }) {
		await Axios.get('https://opentdb.com/api_category.php')
			.then((response) => {
				commit('initCategories', response.data.trivia_categories);
			})
			.catch(() => {});
	},
	async getQuestions({ commit }, { amount, category, difficulty }) {
		await Axios.get(`https://opentdb.com/api.php?type=multiple&amount=${amount}&category=${category}&difficulty=${difficulty}`)
			.then((response) => {
				commit('initQuestions', Lodash.shuffle(response.data.results));
			})
			.catch(() => {
				commit('initQuestions', Lodash.shuffle(Questions.results));
			});
	},
	setQuizActive({ commit }) {
		commit('initQuizActive');
	},
	setQuizInactive({ commit }) {
		commit('initQuizInactive');
	},
	setQuizIndex({ commit }, index) {
		commit('initQuizIndex', index);
	},
};

const mutations = {
	initCategories: (state, categories) => {
		state.categories = categories;
	},
	initQuestions: (state, questions) => {
		for (let i = 0; i < questions.length; i += 1) {
			questions[i].selected_answer = null;
		}
		state.questions = questions;
	},
	initQuizActive: (state) => {
		state.quiz.active = true;
	},
	initQuizInactive: (state) => {
		state.quiz.active = false;
	},
	initQuizIndex: (state, index) => {
		state.quiz.index = index;
	},
};

const state = {
	quiz: {
		active: false,
		index: 0,
	},
	questions: [
		{
			category: 'unknown',
			type: 'unknown',
			difficulty: 'unknown',
			question: 'empty',
			correct_answer: 'unknown',
			incorrect_answers: ['unknown'],
			selected_answer: null,
		},
	],
	categories: [],
};

export default {
	state,
	getters,
	actions,
	mutations,
};
