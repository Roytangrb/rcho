<template>
	<v-container>
		<v-layout>
			<v-file-input
				label="Upload a sheet to calculate"
				:hint="hint"
				prepend-icon="mdi-file-excel-outline"
				accept=".xlxs,.csv"
			>
			</v-file-input>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		name: 'TableUpload',
		data: () => ({
			hint: "Only accepts .xlxs .csv"
		}),
		methods: {

		}
	}
</script>

<style scoped lang="sass">
	
</style>