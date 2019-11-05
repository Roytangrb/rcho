<template>
	<v-list-group
    :prepend-icon="icons.door"
    :value="true"
  >
    <template v-slot:activator>
      <v-list-item-title>
        <span>Room: {{ value.name || ' - ' }}</span>
        <v-chip class="ma-2" label v-if="area">使用面積: {{ format(area) }} m²</v-chip>
        <v-chip class="ma-2" label v-if="volume">體積: {{ format(volume) }} m³</v-chip>
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
                  label="Room name"
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
                label="Width"
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
                label="Depth"
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
                label="Height"
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
				<v-list-item-title>Materials</v-list-item-title>
				<v-list-item-icon>
					<v-icon>{{ icons.wall }}</v-icon>
				</v-list-item-icon>
      </template>

      <v-list-item v-for="(item, index) in value.items" :key="index">
				<v-list-item-content>
					<v-list-item-title>
            <span>{{ index+1 }} . </span>
            <v-chip class="ma-2" label v-if="item.material">極限散發係數: {{ format(item.material) }}</v-chip>
            <v-chip class="ma-2" label v-if="item.area">乘載率: {{ format(item.area / volume) }}</v-chip>
            <v-chip class="ma-2" label v-if="N">N: {{ format(N) }}</v-chip>
            <v-chip class="ma-2" label v-if="N && item.material">修正承載率: {{ format(N / item.material) }}</v-chip>
          </v-list-item-title>
					<v-row>
					  <v-col cols="12" md="6">
					    <v-select
                label="Material"
                :items="materials"
                v-model="item.material"
                item-text="label"
                item-value="value"
                :clearable="true"
              >
              </v-select>
					  </v-col>
					  <v-col cols="12" md="6">
					    <v-text-field
					        v-model="item.area"
					        :rules="num_rules"
					        label="Area"
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
            <v-btn rounded color="secondary" dark @click="addMaterial">Add a material</v-btn>
          </div>
        </v-list-item-content>
      </v-list-item>

    </v-list-group>
  </v-list-group>
</template>

<script>
	import { mdiDoorClosed, mdiWall, mdiTrashCanOutline} from '@mdi/js'
  import materials from '../modules/materials.js'

	export default{
		name: "MuaualForm",
    props: {
      value: Object, // room obj containing room promitive data
    },
		data: ()=>({
      icons: {
        door: mdiDoorClosed,
        wall: mdiWall,
        trash: mdiTrashCanOutline,
      },
      materials: materials,
      num_rules: [
        v => !!v || 'Required',
        v => !isNaN(Number(v)) || 'Must be a number',
        v => Number(v) > 0 || 'Invalid numebr'
      ],

      room_valid: false,
		}),
    watch: {
      value: {
        handler(val){
          console.log(val)
          this.$emit('input', val)
        },
        deep: true
      }
    },
    computed: {
      area(){
        return Number(this.value.width) * Number(this.value.depth)
      },
      volume(){
        return Number(this.value.width) * Number(this.value.depth) * Number(this.value.height)
      },
      N(){
        var vm = this
        return vm.value.items.reduce((acc, item)=>{ //房間材料承載率和
          var weight_ratio = Number(item.area) / Number(vm.volume)
          return acc + Number(item.material) * weight_ratio
        }, 0)
      }
    },
		methods:{
      delRoom(){
        var room_id = this.value.id

        this.$emit('delete', room_id)
      },
      addMaterial(){
        var vm = this
        vm.value.items.push({
          material: null, 
          area: null 
        })
      },
      delMaterial(index){
      	var vm = this
      	vm.value.items.splice(index, 1)
      },
      format(num){
        if (isNaN(Number(num))) {
          return null
        }
        return Number(num).toFixed(2)
      }
		}
	}
</script>