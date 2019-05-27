<template>
	<div class="quizbox-wrapper">
		<div class="quizbox-header">
			<p>question: {{index + 1}}/{{total}}</p>
			<p>correct: {{numCorrect}}/{{numTotal}}</p>
		</div>
		<QuestionBox
			v-bind:currentQuestion="questions[index]"
			v-bind:increment="increment"
			v-bind:next="next"
			v-bind:previous="previous"
			v-bind:nextActive="nextActive"
			v-bind:previousActive="previousActive"
			/>
	</div>
</template>

<script>
import QuestionBox from '@/components/QuestionBox.vue';

export default {
	name: 'QuizBox',
	components: {
		QuestionBox,
	},
	props: {
		questions: Array,
		setQuizIndex: Function,
		activeIndex: Number,
	},
	data() {
		return {
			index: 0, // courent question index
			total: 0, // total amount of questions
			// questions: [], // question table
			numTotal: 0, // number of answered questions
			numCorrect: 0, // number of correct answares
		};
	},
	methods: {
		increment(isCorrect) {
			if (isCorrect) {
				this.numCorrect += 1;
			}
			this.numTotal += 1;
		},
		next() {
			if (this.index < this.total) {
				this.index += 1;
				this.setQuizIndex(this.index);
			}
		},
		nextActive() {
			return this.index < this.total - 1;
		},
		previous() {
			if (this.index > 0) {
				this.index -= 1;
				this.setQuizIndex(this.index);
			}
		},
		previousActive() {
			return this.index > 0;
		},
	},
	created() {
		this.total = this.questions.length;
		this.index = this.activeIndex;
	},
	watch: {
		questions: {
			immediate: true,
			handler() {
				this.total = this.questions.length;
				console.log(this.questions);
			},
		},
	},
};
</script>
