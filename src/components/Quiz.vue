<template>
	<b-container class="quiz-wrapper">
		<h1>Quiz wrapper</h1>
		<QuizSelector
			v-bind:categories="allCategories"
			v-bind:show="show"
			v-if="quizSelectorAvtive"
		/>
		<QuizBox
			v-bind:questions="allQuestions"
			v-bind:setQuizIndex="setQuizIndex"
			v-bind:activeIndex="activeIndex"
			v-bind:getLastId="getLastId"
			v-bind:lsUpdateQuiz="lsUpdateQuiz"
			v-bind:setQuizInactive="setQuizInactive"
			v-if="quizBoxAvtive"
		/>
	</b-container>
</template>

<script>
// import moment from 'moment';
import QuizSelector from '@/components/QuizSelector.vue';
import QuizBox from '@/components/QuizBox.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Quiz',
	components: {
		QuizSelector,
		QuizBox,
	},
	data() {
		return {
			qconfig: {
				amount: 5,
				category: 17,
				difficulty: 'medium',
			},
			quizBoxAvtive: false,
			quizSelectorAvtive: true,
			datetime: null,
		};
	},
	computed: {
		...mapGetters(['allCategories', 'allQuestions', 'isActive', 'activeIndex', 'getLastId']),
	},
	methods: {
		...mapActions(['getCategories', 'getQuestions', 'setQuizActive', 'setQuizInactive', 'setQuizIndex', 'lsInsertQuiz', 'lsUpdateQuiz']),
		show({ category, amount, difficulty }) {
			this.qconfig.amount = amount;
			this.qconfig.category = category;
			this.qconfig.difficulty = difficulty;

			if (!this.isActive) {
				this.getQuestions(this.qconfig);

				this.lsInsertQuiz({
					category: null,
					difficulty: null,
					questions: this.qconfig.amount,
					result: 0,
					finished: false,
					points: 0,
				});
				this.setQuizActive();
			}

			this.quizBoxAvtive = true;
			this.quizSelectorAvtive = false;
		},
		/* setDateTime() {
			this.datetime = moment().locale('pl').format('YYYY.MM.DD HH:mm:ss');
			// console.log(this.datetime);
		}, */
	},
	beforeCreate() {
		// console.log('%c beforeCreate', 'color:red');
	},
	created() {
		if (this.isActive) {
			this.quizBoxAvtive = true;
			this.quizSelectorAvtive = false;
		} else {
			this.getCategories();
			this.setQuizIndex(0);
		}

		/* setInterval(() => {
			this.setDateTime();
		}, 1000); */
	},
	beforeMount() {
		// console.log('%c beforeMount', 'color:red');
	},
	mounted() {
		// this.getCategories();
		// console.log('%c mounted', 'color:red');
	},
	beforeUpdate() {
		// console.log('%c beforeUpdate', 'color:red');
	},
	updated() {
		// console.log('%c updated', 'color:red');
	},
	beforeDestroy() {
		// console.log('%c beforeDestroy', 'color:red');
	},
	destroyed() {
		// console.log('%c destroyed', 'color:red');
	},
};
</script>
