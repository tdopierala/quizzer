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
		getLastId: Number,
		lsUpdateQuiz: Function,
		setQuizInactive: Function,
	},
	data() {
		return {
			index: 0, // courent question index
			total: 0, // total amount of questions
			// questions: [], // question table
			numTotal: 0, // number of answered questions
			numCorrect: 0, // number of correct answares
			qId: null,
			qCategory: null,
			qDifficulty: null,
			qPoints: 0,
		};
	},
	methods: {
		increment(isCorrect) {
			if (isCorrect) {
				this.numCorrect += 1;

				let multiplier = 0;
				switch (this.qDifficulty) {
				case 'easy': multiplier = 1;
					break;
				case 'medium': multiplier = 3;
					break;
				case 'hard': multiplier = 5;
					break;
				default: multiplier = 0;
				}

				this.qPoints += 17 * multiplier;
			}

			this.numTotal += 1;

			const prop = { result: this.numCorrect, points: this.qPoints };
			if (this.total === this.numTotal) {
				prop.finished = true;
				this.setQuizInactive();
			}

			this.lsUpdateQuiz({
				id: this.qId,
				prop,
			});
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
		this.qId = this.getLastId;
		this.total = this.questions.length;
		this.index = this.activeIndex;
	},
	watch: {
		getLastId: {
			immediate: true,
			handler() {
				if (this.qId === null) {
					this.qId = this.getLastId;
					console.log(this.qId);
				}
			},
		},
		questions: {
			immediate: true,
			handler() {
				if (this.qCategory === null && this.qId !== null) {
					this.qCategory = this.questions[0].category;

					this.lsUpdateQuiz({
						id: this.qId,
						prop: { category: this.qCategory },
					});
				}

				if (this.qDifficulty === null && this.qId !== null) {
					this.qDifficulty = this.questions[0].difficulty;

					this.lsUpdateQuiz({
						id: this.qId,
						prop: { difficulty: this.qDifficulty },
					});
				}

				this.total = this.questions.length;
			},
		},
	},
};
</script>
