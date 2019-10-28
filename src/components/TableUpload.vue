<template>
	<v-container>
		<v-row>
			<v-col sm="12" md="6">
				<v-file-input
					label="Click or drag file to upload"
					:hint="hint"
					prepend-icon="mdi-file-excel-outline"
					accept=".xlsx,.csv"

					v-on:drop="handleDrop"
				>
				</v-file-input>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import XLSX from 'xlsx'

	export default {
		name: 'TableUpload',
		data: () => ({
			hint: "Only accepts .xlxs .csv"
		}),
		methods: {
			handleDrop(e) {
				console.log(e)
				e.stopPropagation()
				e.preventDefault()
				var files = e.dataTransfer.files
				var f = files[0]
				var reader = new FileReader()
				reader.onload = function(e) {
					var data = new Uint8Array(e.target.result)
					var workbook = XLSX.read(data, {type: 'array'})
					
					/* DO SOMETHING WITH workbook HERE */
					console.log(workbook)
				};
				reader.readAsArrayBuffer(f);
			}
		}
	}
</script>

<style scoped lang="less">
	
</style>