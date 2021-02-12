<template>
	<div class="question-wrapper">

		<b-jumbotron>
			<h3 v-html="currentQuestion.question"></h3>
			<hr class="my-4">

			<b-list-group>
				<b-list-group-item
					v-for="(answer, index) in answers"
					v-on:click="selectAnswer(index)"
					v-bind:key="index"
					v-bind:class="answerClass(index)">

					<span v-html="answer"></span>

				</b-list-group-item>
			</b-list-group>

			<b-button
				v-on:click="previous"
				v-bind:disabled="!previousActive()"
				variant="primary"
			>Previous</b-button>
			<b-button
				v-on:click="next"
				v-bind:disabled="!nextActive()"
				variant="primary"
			>Next</b-button>
		</b-jumbotron>

	</div>
</template>

<script>
import Lodash from 'lodash';

export default {
	name: 'QuestionBox',
	props: {
		currentQuestion: Object,
		next: Function,
		nextActive: Function,
		previous: Function,
		previousActive: Function,
		increment: Function,
	},
	data() {
		return {
			// correctAnswer: null,
			selectedIndex: null,
			answered: false,
		};
	},
	methods: {
		selectAnswer(index) {
			if (!this.answered) {
				this.selectedIndex = index;
				// console.log(index === this.correctAnswer);

				this.submitAnswer();
				// this.next();
			}
		},
		submitAnswer() {
			let isCorrect = false;

			if (this.selectedIndex === this.correctAnswer) {
				isCorrect = true;
			}

			this.answered = true;
			this.currentQuestion.selected_answer = this.selectedIndex;

			this.increment(isCorrect);
		},
		answerClass(index) {
			let itemClass = '';

			if (!this.answered && this.selectedIndex === index) {
				itemClass = 'selected';
			} else if (this.answered && this.correctAnswer === index) {
				itemClass = 'correct';
			} else if (this.answered && this.selectedIndex === index && this.correctAnswer !== index) {
				itemClass = 'incorrect';
			}

			return itemClass;
		},
	},
	computed: {
		answers() {
			let answers = [...this.currentQuestion.incorrect_answers];
			answers.push(this.currentQuestion.correct_answer);
			answers = Lodash.shuffle(answers);
			Lodash.shuffle(answers);
			return answers;
		},
		correctAnswer() {
			return this.answers.indexOf(this.currentQuestion.correct_answer);
		},
	},
	watch: {
		currentQuestion: {
			immediate: true,
			handler() {
				// console.log(this.answers);
				if (this.currentQuestion.selected_answer !== null) {
					this.selectedIndex = this.currentQuestion.selected_answer;
					this.answered = true;
				} else {
					this.selectedIndex = null;
					this.answered = false;
				}
			},
		},
	},
};
</script>
