<template>
	<div class="quizselector-wrapper">
		<b-form-group>
			<b-form-select
				v-model="category"
				v-bind:options="categoryOptions">

			</b-form-select>
		</b-form-group>

		<b-form-group>
			<b-form-select
				v-model="difficulty"
				v-bind:options="difficultyOptions">

			</b-form-select>
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
			categoryOptions: [{
				value: null,
				text: '-- Select category --',
				disabled: true,
			}],
			difficulty: null,
			difficultyOptions: [{
				value: null,
				text: '-- Select difficulty --',
				disabled: true,
			}],
		};
	},
	methods: {
		selectQuiz() {
			this.show(this);
		},
		fillCategoies() {
			for (let i = 0; i < this.categories.length; i += 1) {
				this.categoryOptions.push({
					value: this.categories[i].id,
					text: this.categories[i].name,
					disabled: false,
				});
			}
		},
		fillDifficulty() {
			this.difficultyOptions = this.difficultyOptions.concat([
				{ value: 'easy', text: 'easy', disabled: false },
				{ value: 'medium', text: 'medium', disabled: false },
				{ value: 'hard', text: 'hard', disabled: false },
			]);
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
