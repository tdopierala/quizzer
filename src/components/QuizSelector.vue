<template>
	<div class="quizselector-wrapper">
		<b-form-group>
			<b-form-select
				v-model="category"
				v-bind:options="categoryOptions"
			></b-form-select>
		</b-form-group>

		<b-form-group>
			<b-form-select
				v-model="difficulty"
				v-bind:options="difficultyOptions"
			></b-form-select>
		</b-form-group>

		<b-form-group>
			<b-form-input v-model="amount" type="number"></b-form-input>
		</b-form-group>

		<b-form-group>
			<b-button
				v-on:click="selectQuiz"
				variant="primary"
				class="btn-select-quiz"
			>Run Quiz</b-button>
		</b-form-group>
	</div>
</template>

<script>
export default {
	name: 'QuizSelector',
	props: {
		categories: Array,
		show: Function,
	},
	data() {
		return {
			amount: 10,
			category: null,
			categoryOptions: [],
			difficulty: null,
			difficultyOptions: [],
		};
	},
	methods: {
		selectQuiz() {
			this.show(this);
		},
		fillCategoies() {
			const options = [];
			for (let i = 0; i < this.categories.length; i += 1) {
				options.push({
					value: this.categories[i].id,
					text: this.categories[i].name,
				});
			}
			this.categoryOptions = options;
		},
		fillDifficulty() {
			this.difficultyOptions = [
				{ value: 'easy', text: 'easy' },
				{ value: 'medium', text: 'medium' },
				{ value: 'hard', text: 'hard' },
			];
		},
	},
	created() {
		this.fillDifficulty();
	},
	watch: {
		categories: {
			immediate: true,
			handler() {
				this.fillCategoies();
			},
		},
	},
};
</script>
