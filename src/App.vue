<template>
	<div id="app">

		<header id="header">

			<div id="logo">
				<router-link to="/">
					<span>Q</span>
					<span>u</span>
					<span>i</span>
					<span>z</span>
					<span>z</span>
					<span>e</span>
					<span>r</span>
				</router-link>
			</div>

			<div id="nav">
				<router-link to="/">Home</router-link>
				<router-link to="/quiz">Quiz</router-link>
				<router-link to="/score">Score</router-link>
				<router-link to="/about">About</router-link>
			</div>

		</header>

		<div class="content-wrapper">
			<router-view/>
		</div>

	</div>
</template>
