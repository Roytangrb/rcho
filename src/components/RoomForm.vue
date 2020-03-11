<template>
	<v-list-group
    :prepend-icon="icons.door"
    :value="true"
  >
    <template v-slot:activator>
      <v-list-item-title>
        <span>{{ T['room'] }}: {{ value.name || ' - ' }}</span>
        <v-chip class="ma-2" color="primary" label v-if="!isNaN(getRoomC())">{{ T['concerntration'] }}: {{ format(getRoomC(), 4) }} mg/m²</v-chip>
        <v-chip class="ma-2" label v-if="area">{{ T['area'] }} : {{ format(area) }} m²</v-chip>
        <v-chip class="ma-2" label v-if="volume">{{ T['volume'] }}: {{ format(volume) }} m³</v-chip>
      </v-list-item-title>
    </template>

    <v-list-item>
      <v-list-item-content>
      	<div class="text-right">
      		<v-icon @click="delRoom">{{ icons.trash }}</v-icon>
      	</div>
        <v-form ref="room-form" v-model="room_valid">
          <v-row>
            <v-col>
              <v-text-field
                  v-model="value.name"
                  :label="T['room_name']"
                  type="text"
                ></v-text-field>
            </v-col>
          </v-row>

          <v-row> 
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="value.width"
                :rules="num_rules"
                :label="T['width']"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="value.depth"
                :rules="num_rules"
                :label="T['depth']"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="value.height"
                :rules="num_rules"
                :label="T['height']"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>        
      </v-list-item-content>
    </v-list-item>

    <v-list-group sub-group
      v-if="room_valid"
      :value="room_valid"
    >
      <template v-slot:activator>
				<v-list-item-title>{{ T['materials'] }}</v-list-item-title>
				<v-list-item-icon>
					<v-icon>{{ icons.wall }}</v-icon>
				</v-list-item-icon>
      </template>

      <v-list-item v-for="(item, index) in value.items" :key="index">
				<v-list-item-content>
					<v-list-item-title>
            <span>{{ index+1 }} . </span>
            <v-chip class="ma-2" label v-if="item.material_level">
              {{ T[calcType] }}{{ T['emi_coef'] }}: {{ getFactor(item) }}mg/m²
            </v-chip>
            <v-chip class="ma-2" label v-if="item.area">{{ T['share_ratio'] }}: {{ format(item.area / volume) }} m²/m³</v-chip>
            <v-chip class="ma-2" label v-if="!isNaN(getMaterialC(item))">{{ T['concerntration'] }}: {{ format(getMaterialC(item), 4) }}mg/m³</v-chip>
          </v-list-item-title>
					<v-row>
            <!-- room material -->
					  <v-col cols="12" md="6">
					    <v-select
                :label="T['material']"
                :items="materials"
                v-model="item.material_id"
                item-text="name"
                item-value="id"
                clearable
              >
              </v-select>
					  </v-col>
            <!-- room material level -->
            <v-col cols="12" md="3">
              <v-select
                :label="T['material_level']"
                :items="getMaterialLevels(item.material_id)"
                v-model="item.material_level"
                item-text="level"
                item-value="code"
                >
              </v-select>
            </v-col>
            <!-- room material area -->
					  <v-col cols="12" md="3">
					    <v-text-field
				        v-model="item.area"
				        :rules="num_rules"
				        :label="T['area']"
				        type="number"
				        suffix="m²"
				        required
				      >
					    </v-text-field>
					  </v-col>
					</v-row>
	      </v-list-item-content>
	      <v-list-item-icon>
					<v-icon @click="delMaterial(index)">{{ icons.trash }}</v-icon>
				</v-list-item-icon>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <div class="text-right">
            <v-btn rounded color="secondary" dark @click="addMaterial">{{ T['add_material'] }}</v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>

    </v-list-group>
  </v-list-group>
</template>

<script>
	import { mdiDoorClosed, mdiWall, mdiTrashCanOutline} from '@mdi/js'
  import { materials, U } from '../modules/materials.js'

	export default{
		name: "MuaualForm",
    props: {
      value: Object, // room obj containing room promitive data
      lang: String,
    },
		data(){
      var translation = {
        EN: {
          room: 'Room',
          room_name: 'Room name',
          width: 'Width',
          depth: 'Depth',
          height: 'Height',
          area: 'Area',
          volume: 'Volume',
          materials: 'Materials',
          material: 'Material',
          add_material: 'Add a material',
          emi_coef: ' Y',
          share_ratio: 'L',
          rcho: 'Formaldehyde',
          tvoc: 'TVOC',
          concerntration: 'C',
          required: 'Required',
          must_be_num: 'Must be a number',
          invalid_num: 'Invalid number',
        },
        CN: {
          room: '房間',
          room_name: '房間名稱',
          width: '長',
          depth: '寬',
          height: '高',
          area: '使用面積',
          volume: '體積',
          materials: '材料清單',
          material: '材料',
          add_material: '添加材料',
          emi_coef: '材料係數',
          share_ratio: '乘載率',
          rcho: '甲醛',
          tvoc: 'TVOC',
          concerntration: '濃度',
          required: '必須填寫',
          must_be_num: '必須為數字',
          invalid_num: '錯誤數字輸入',
        }
      }
      var icons = {
        door: mdiDoorClosed,
        wall: mdiWall,
        trash: mdiTrashCanOutline,
      }
      return { 
        room_valid: false,
        translation,
        icons,
        materials,
        U, //constant
        calcType: 'rcho', // 'rcho'|'tvoc'
      }
		},
    watch: {
      value: {
        handler(val){
          // console.log(val)
          this.$emit('input', val)
        },
        deep: true
      }
    },
    computed: {
      T(){
        return this.translation[this.lang]
      },
      num_rules(){
        return [
          v => !!v || this.T['required'],
          v => !isNaN(Number(v)) || this.T['must_be_num'],
          v => Number(v) > 0 || this.T['invalid_num']
        ]
      },
      area(){
        return Number(this.value.width) * Number(this.value.depth)
      },
      volume(){
        return Number(this.value.width) * Number(this.value.depth) * Number(this.value.height)
      },
    },
		methods:{
      delRoom(){
        var room_id = this.value.id

        this.$emit('delete', room_id)
      },
      addMaterial(){
        var vm = this
        vm.value.items.push({
          material_id: null, 
          material_level: null,
          area: null,
        })
      },
      getMaterialLevels(id){
        var vm = this
        if (id || id === 0) {
          var material = vm.materials.find(item => item.id === id) || {}
          var levels = material.levels || []
          return levels
        }

        return []
      },
      getFactor(item){
        var vm = this
        var levels = vm.getMaterialLevels(item.material_id)
        var level = levels.find(d => d.code == item.material_level) || {}

        var factor = level[vm.calcType]

        if (!factor && factor !== 0){
          return NaN
        }

        return factor
      },
      getMaterialL(item){
        var item_area = item.area

        if (!item_area && item_area !== 0){
          return NaN
        }
        
        return Number(item_area) / this.volume
      },
      getMaterialC(item){
        var vm = this
        var Y = vm.getFactor(item)
        var L = vm.getMaterialL(item)
        var C = vm.U * Y * L

        if (isNaN(C)){
          return NaN
        }

        return C
      },
      getRoomC(){
        var vm = this
        var C = vm.value.items.reduce((c, material) => {
          return c + vm.getMaterialC(material)
        }, 0)

        if (isNaN(C) || vm.value.items.length == 0){
          return NaN
        }

        return C
      },
      delMaterial(index){
      	var vm = this
      	vm.value.items.splice(index, 1)
      },
      format(num, precision=2){
        if (isNaN(Number(num))) {
          return null
        }
        return Number(num).toFixed(precision)
      }
		}
	}
</script>