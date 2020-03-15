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
					@change="selectFile"
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
	        :loading="!has_data"
	        type="table-heading, table-tbody, table-tfoot"
	        class="mx-auto"
	      >
	      	<v-data-table
				    :headers="preview_data.headers"
				    :items="preview_data.items"
				    :items-per-page="5"
				    class="elevation-1"
				  ></v-data-table>
	      </v-skeleton-loader>
			</v-col>
		</v-row>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ prompt_title }}
        </v-card-title>

        <v-card-text class="mt-2">
          {{ prompt_content }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
			has_data: false,
			preview_data: {
				headers: [],
				items: [],
			},
			dialog: false,
			prompt_title: '',
			prompt_content: '',

			icons: {
				import: mdiDatabaseImport,
				excel: mdiFileExcelOutline,
			}
		}),
		methods: {
			selectFile(file){
				var vm = this
				
				console.log('file picked')

				if (!file){
					return vm.reset()
				}
				
				vm.file = file

				try {
					vm.readFile(file)
				} catch (err){
					vm.reset()
					console.log(err)
					vm.prompt('Error', 'Please try again.')
				}
			},
			drop(e) {
				var vm = this

				console.log('file dropped')

				if (!vm.template){
					vm.prompt('Reminder', 'Please choose a template first.')
					return vm.reset()
				}

				if (!e){
					return vm.reset()
				}

				if (!e.dataTransfer || !e.dataTransfer.files) {
					return vm.reset()
				}
				var files = e.dataTransfer.files
				var file = files[0]

				if (!file) {
					return vm.reset()
				}

				vm.file = file

				try {
					vm.readFile(file)
				} catch (err){
					vm.reset()
					console.log(err)
					vm.prompt('Error', 'Please try again.')
				}
			},
			readFile(f){
				var vm = this

				var reader = new FileReader()
				reader.onload = function(e) {
					var data = new Uint8Array(e.target.result)
					var workbook = XLSX.read(data, {type: 'array'})
					
					/* DO SOMETHING WITH workbook HERE */
					var first_sheet = vm.readSheet(workbook)
					vm.preview_data = vm.handleSheet(first_sheet)
					vm.has_data = true
				}
				reader.readAsArrayBuffer(f)
			},
			readSheet(workbook, index=0){
				if (!workbook) return

				// var vm = this
				var sheet_names = workbook.SheetNames || []
				var sheet_name = sheet_names[index]
				if(sheet_name){
					var sheet = workbook.Sheets[sheet_name]

					return sheet
				}

				return null
			},
			handleSheet(sheet){
				if (!sheet) return 

				// var vm = this
				var headers = []
				var items = XLSX.utils.sheet_to_json(sheet) || []
				
				if (items.length){
					var first = items[0]
					headers = Object.keys(first)

					//convert to v-data-table readable format
					headers = headers.map(key => ({
						text: key,
						value: key,
					}))
				}

				return { headers, items }
			},
			reset(){
				var vm = this
				vm.has_data = false
				vm.file = null
				vm.overlay = false
			},
			prompt(title, content){
				var vm = this

				vm.dialog = true
				vm.prompt_title = title
				vm.prompt_content = content
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