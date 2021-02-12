<template>
	<div class="score-wrapper">
		<h1>Your score</h1>
		<!-- <b-table striped hover v-bind="quizzes"></b-table> -->
		<table class="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Date</th>
					<th>Category</th>
					<th>Difficulty</th>
					<th>Questions</th>
					<th>Correct</th>
					<th>Points</th>
					<th>Finished</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(quiz, index) in allQuizzes" v-bind:key="index">
					<td>{{ quiz.id }}</td>
					<td>{{ quiz.date }}</td>
					<td>{{ quiz.category }}</td>
					<td>{{ quiz.difficulty }}</td>
					<td>{{ quiz.questions }}</td>
					<td>{{ quiz.result }}</td>
					<td>{{ quiz.points }}</td>
					<td>{{ quiz.finished }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="6"></td>
					<td>{{ totalPoints }}</td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Score',
	data() {
		return {
			quizzes: [],
			totalPoints: 0,
		};
	},
	methods: {
		...mapActions(['allCategories', 'lsSelectQuizzes']),
	},
	computed: {
		...mapGetters(['allQuizzes']),
	},
	created() {
		this.lsSelectQuizzes();

		// console.table(this.allQuizzes);

		/* for (let i = 0; i < this.allQuizzes.length; i += 1) {
			// console.log(this.allQuizzes[i].id.toString());
			this.quizzes.push({
				id: this.allQuizzes[i].id.toString(),
				date: this.allQuizzes[i].date,
				category: this.allQuizzes[i].category,
				total_questions: this.allQuizzes[i].questions.toString(),
				correct: this.allQuizzes[i].result.toString(),
				is_finished: this.allQuizzes[i].finished.toString(),
				points: this.allQuizzes[i].points.toString(),
			});
		}

		console.table(this.quizzes); */
	},
	watch: {
		allQuizzes: {
			immediate: true,
			handler() {
				this.quizzes = this.allQuizzes;

				for (let i = 0; i < this.quizzes.length; i += 1) {
					this.quizzes[i].date = moment(this.quizzes[i].date).format('DD-MM-YYYY HH:mm:ss');
					this.totalPoints += this.quizzes[i].points;
				}

				// console.log(this.quizzes);
			},
		},
	},
};
</script>

<style>

</style>
