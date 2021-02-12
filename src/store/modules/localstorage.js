import Dexie from 'dexie';

const db = new Dexie('quizzer_db');
db.version(1).stores({
	quizzes: '++id, date, category, difficulty, questions, result, finished, points',
});

const getters = {
	allQuizzes: (state) => state.quizzes,
	getLastId: (state) => state.lastId,
};

const actions = {
	async lsSelectQuizzes({ commit }) {
		const result = await db.quizzes.limit(10).toArray()
			.then((res) => res)
			.catch(() => {});

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
