<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="6">
				<v-select
					label="Template"
					:items="templates"
					v-model="template"
					item-text="label"
          item-value="value"
          :clearable="true"
				>
				</v-select>

				<v-file-input
					label="Click to upload"
					:hint="hint_file"
					:prepend-icon="icons.excel"
					accept=".xlsx,.csv"
					:disabled="!template"
					@change="drop"
				>
				</v-file-input>

				<div class="text-center mb-3">
					<span class="or">Or</span>
				</div>

				<div 
					class="drop-zone"
					@drop.stop.prevent="drop"
					@dragover.prevent="dragover"
				>
					<v-icon>{{ icons.import }}</v-icon>
					<span>Drop a sheet file here...</span>
				</div>

			</v-col>
			<v-col cols="12" md="6">
				
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import XLSX from 'xlsx'

	import { mdiDatabaseImport, mdiFileExcelOutline} from '@mdi/js'

	export default {
		name: 'TableUpload',
    props: ['lang'],
		data: () => ({
			hint_file: "Only accepts .xlxs .csv",
			templates: [
				{ label: '酷家樂', value: 'kujiale' },
			],
			template: null,
			file: null,

			icons: {
				import: mdiDatabaseImport,
				excel: mdiFileExcelOutline,
			}
		}),
		methods: {
			drop(e) {
				var vm = this

				console.log(e)
				if (!e.dataTransfer || !e.dataTransfer.files) {
					return 
				}
				var files = e.dataTransfer.files
				var f = files[0]
				if (!f) {
					return 
				}
				vm.file = f

				vm.readFile(f)
			},
			readFile(f){
				var reader = new FileReader()
				reader.onload = function(e) {
					var data = new Uint8Array(e.target.result)
					var workbook = XLSX.read(data, {type: 'array'})
					
					/* DO SOMETHING WITH workbook HERE */
					console.log(workbook)
				};
				reader.readAsArrayBuffer(f);
			},
			dragover(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped lang="less">
	.or {
		position: relative;
		&::before, 
		&::after{
			content: "";
			position: absolute;
			top: 50%;
			width: 200%;
			border-bottom: 1px solid #ccc; 
		}

		&::before{
			right: 130%;
		}

		&::after{
			left: 130%;
		}
	}

	.drop-zone{
		width: 100%;
		height: 300px;
		border-radius: 5px;
		border: 1px solid #ccc;
		display: flex;
		justify-content: center;
		align-items: center;
		font: 20px;
		font-weight: 600;
		color: #ccc;
	}
</style>