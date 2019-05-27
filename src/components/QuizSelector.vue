<template>
	<div class="quizselector-wrapper">
		<b-form-group>
			<b-form-select
				v-model="category"
				v-bind:options="options"
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
			category: null,
			amount: 10,
			options: [],
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
			this.options = options;
		},
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
