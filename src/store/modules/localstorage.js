import Dexie from 'dexie';

const db = new Dexie('quizzer_db');
db.version(1).stores({
	quizzes: '++id, date, category, difficulty, questions, result, finished, points',
});

const getters = {
	allQuizzes: state => state.quizzes,
	getLastId: state => state.lastId,
};

const actions = {
	async lsSelectQuizzes({ commit }) {
		const result = await db.quizzes.limit(10).toArray();
		// console.log(result);
		commit('initSelect', result);
	},
	async lsInsertQuiz({ commit }, quiz) {
		const id = await db.quizzes.put(
			{
				date: Date.now(),
				category: quiz.category,
				difficulty: quiz.difficulty,
				questions: quiz.questions,
				result: quiz.result,
				finished: quiz.finished,
				points: quiz.points,
			},
		);
		commit('initInsert', id);
	},
	async lsUpdateQuiz({ commit }, quiz) {
		await db.quizzes.where('id').equals(quiz.id).modify(quiz.prop);

		commit('initUpdate');
	},
	async lsDeleteQuiz({ commit }, quiz) {
		await db.quizzes.where('id').equals(quiz.id).delete();

		commit('initDelete');
	},
	async lsInsertDefault({ commit }) {
		await db.quizzes.bulkPut([
			{
				date: Date.now(), category: 'Test Dexie', questions: 10, result: 4, points: 12,
			},
			{
				date: Date.now(), category: 'Test Dexie 2', questions: 15, result: 5, points: 15,
			},
			{
				date: Date.now(), category: 'Test Dexie 2', questions: 11, result: 1, points: 3,
			},
		]);
		commit('initInsert');
	},
};

const mutations = {
	initSelect: (state, result) => {
		state.quizzes = result;
	},
	initInsert: (state, id) => {
		state.lastId = id;
	},
	initUpdate: () => {},
	initDelete: () => {},
};

const state = {
	quizzes: [],
	lastId: null,
};

export default {
	state,
	getters,
	actions,
	mutations,
};
