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
			v-if="quizBoxAvtive"
		/>
	</b-container>
</template>

<script>
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
			},
			quizBoxAvtive: false,
			quizSelectorAvtive: true,
		};
	},
	methods: {
		...mapActions(['getCategories', 'getQuestions', 'setQuizActive', 'setQuizInactive', 'setQuizIndex']),
		show({ category, amount }) {
			this.qconfig.amount = amount;
			this.qconfig.category = category;

			if (!this.isActive) {
				this.getQuestions(this.qconfig);
				this.setQuizActive();
			}

			this.quizBoxAvtive = true;
			this.quizSelectorAvtive = false;
		},
	},
	computed: {
		...mapGetters(['allCategories', 'allQuestions', 'isActive', 'activeIndex']),
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
