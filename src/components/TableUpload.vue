<template>
	<v-container>
		<v-row>
			<v-col cols="12" md="5">
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
					:value="file"
				>
				</v-file-input>

				<div class="drop-zone"
					@drop.prevent.stop="drop"
					@dragover.prevent="overlay = true"
					@mouseleave="overlay = false"
				>
					<div v-show="!overlay">
						<v-icon>{{ icons.import }}</v-icon>
						Drop a sheet file
					</div>

					<v-overlay
	          absolute
	          :value="overlay"
	        >
	        	<div v-if="!!template">
	        		Upload
	        	</div>
	        	<div v-else>
	        		Please select a template
	        	</div>
	        </v-overlay>
				</div>
			</v-col>

			<v-col cols="12" md="7">
	      <v-skeleton-loader
	        :boilerplate="!processing"
	        type="table-heading, table-tbody, table-tfoot"
	        class="mx-auto"
	      ></v-skeleton-loader>
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
			overlay: false,
			processing: false,
			preview_data: null,

			icons: {
				import: mdiDatabaseImport,
				excel: mdiFileExcelOutline,
			}
		}),
		methods: {
			drop(e) {
				var vm = this

				if (!vm.template || !e){
					return 
				}

				if (!e.dataTransfer || !e.dataTransfer.files) {
					return 
				}
				var files = e.dataTransfer.files
				var f = files[0]
				if (!f) {
					return 
				}
				vm.file = f

				try {
					vm.readFile(f)
				} catch (err){
					vm.reset()
					console.log(err)
				}
			},
			readFile(f){
				var vm = this
				vm.processing = true

				var reader = new FileReader()
				reader.onload = function(e) {
					var data = new Uint8Array(e.target.result)
					var workbook = XLSX.read(data, {type: 'array'})
					
					/* DO SOMETHING WITH workbook HERE */
					var first_sheet = vm.readFirstSheet(workbook)
					vm.preview_data = vm.handleSheet(first_sheet)
					console.log(vm.preview_data)
					vm.processing = false
				}
				reader.readAsArrayBuffer(f)
			},
			readFirstSheet(workbook){
				if (!workbook) return

				// var vm = this
				var has_sheet = workbook.SheetNames && workbook.SheetNames.length
				if(has_sheet){
					var first_sheet_name = workbook.SheetNames[0]
					var first_sheet = workbook.Sheets[first_sheet_name]

					return first_sheet
				}

				return null
			},
			handleSheet(sheet){
				if (!sheet) return 

				// var vm = this
				var headings = []
				var rows = XLSX.utils.sheet_to_json(sheet) || []
				
				if (rows.length){
					var first = rows[0]
					headings = Object.keys(first)
				}

				return { headings, rows }
			},
			reset(){
				var vm = this
				vm.processing = false
				vm.file = null
			}
		}
	}
</script>

<style scoped lang="less">
	.drop-zone{
		position: relative;
		width: 100%;
		height: 300px;
		border-radius: 5px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font: 20px;
		font-weight: 600;
		color: #ccc;
	}
</style>